import React from "react";
import {ModalCard, Modal, ModalCardHead, ModalCardBody, ModalCardFoot} from "../../../components/modals";
import {ProductItem, ProductsCategory, ProductsDisplay, ProductsList} from "../../../components/products";
import {fetchProduct} from "../../../api/specific/products";
import PropTypes from "prop-types";
import UserName from "../../../components/UserName";
import {fetchUser} from "../../../api/specific/users";

export default class SelectShots extends React.Component {

    constructor(props) {
        super(props);

        this.onCommand = this.onCommand.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.calculatePrices = this.calculatePrices.bind(this);
        this.getRemainingCount = this.getRemainingCount.bind(this);
        this.submitCommand = this.submitCommand.bind(this);
        this.getPriceForCurrentState = this.getPriceForCurrentState.bind(this);
        this.sendContributions = this.sendContributions.bind(this);

        this.state = {
            modalOpened: false,
            selectedProduct: null,
            selectedCount: 1,
            selectedMember: 0,

            prices: this.calculatePrices(),
            membersNames: {},
            commands: [],
            nextCommandId: 0,
        };

    }

    componentDidMount() {
        this.props.partyMembers.forEach(id => {
            fetchUser(id).then(result => {
                if (result.ok) {
                    this.setState((state) => {
                        const membersNames = Object.assign({}, state.membersNames);
                        membersNames[id] = result.user.username;
                        return {
                            membersNames,
                        };
                    });
                }
            }).catch(console.log);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.price !== this.props.price) {
            this.setState({
                prices: this.calculatePrices(),
            });
            this.sendContributions();
        }
    }

    sendContributions() {
        this.setState((state, props) => {
            if (this.getRemainingCount(state) === 0) {
                const contributions = [];
                let count = 0;
                state.commands.forEach(command => {
                    for(let i = 0; i < command.count; i++) {
                        contributions.push({
                            product: command.product.id,
                            user: command.member,
                            part: state.prices[count],
                        });
                        count += 1;
                    }
                });
                props.submitContributions(contributions);
            } else {
                props.submitContributions([])
            }
            return {};
        });
    }

    calculatePrices() {
        return this.dispatch(this.props.price, 14);
    }

    dispatch(total, between) {
        if (between === 1) {
            return Math.round(total * 100) / 100;
        }
        const pricePerUser = Math.round(total / between * 100) / 100;
        return [pricePerUser].concat(this.dispatch(total - pricePerUser, between - 1));
    }

    closeModal() {
        this.setState({
            modalOpened: false,
        });
    }

    submitCommand() {
        if (this.state.selectedCount > 0 && this.state.selectedCount <= this.getRemainingCount()) {
            this.closeModal();
            this.setState((state) => {
                const count = state.selectedCount;
                const product = state.selectedProduct;
                const member = state.selectedMember > 0 ? state.selectedMember : null;
                const commands = state.commands.slice();
                const mergeableCommands = commands.filter(command =>
                    command.product.id === state.selectedProduct.id && command.member === state.selectedMember);
                let nextCommandId;
                if (mergeableCommands.length > 0) {
                    mergeableCommands[0].count += this.state.selectedCount;
                    nextCommandId = state.nextCommandId;
                } else {
                    commands.push({
                        count,
                        product,
                        member,
                        id: state.nextCommandId,
                    });
                    nextCommandId = state.nextCommandId + 1;
                }
                return {
                    commands,
                    nextCommandId,
                };
            });
            this.sendContributions();
        }
    }

    onCommand(id) {
        fetchProduct(id).then(result => {
            if (result.ok) {
                this.setState({
                    modalOpened: true,
                    selectedProduct: result.product,
                    selectedCount: 1,
                    selectedMember: 0,
                });
            } else {
                this.setState({
                    modalOpened: false,
                    selectedProduct: null,
                    selectedMember: 0,
                    selectedCount: 1,
                });
            }
        });
    }

    getRemainingCount(state) {
        if(!state) {
            state = this.state;
        }
        return 14 - state.commands.map(c => c.count).reduce((a, b) => a + b, 0);
    }

    getPriceForCurrentState() {
        const start = 14 - this.getRemainingCount();
        let total = 0;
        for (let i = start; i < start + this.state.selectedCount && i < 14; i++) {
            total += this.state.prices[i];
        }

        // Thanks god for float operation and their precision
        total = Math.round(total * 100) / 100;

        return total;
    }

    removeCommand(id) {
        this.setState((state) => {
            const commands = state.commands.filter(c => c.id !== id);
            return {
                commands,
            };
        });
        this.sendContributions();
    }

    render() {
        const commands = this.state.commands.map((command, i, all) => {
            let start = 0;
            for (let j = 0; j < i; j++) {
                start += all[j].count;
            }
            const end = start + command.count - 1;
            let price = 0;
            for (let j = start; j <= end; j++) {
                price += this.state.prices[j];
            }
            price = Math.round(price * 100) / 100;
            return {
                ...command,
                start,
                end,
                price,
            };
        });

        return (
            <>
                <h2 className="subtitle is-size-5">
                    3. Sélectionnez les shooters que vous souhaitez
                </h2>

                <table className="table is-striped">
                    <thead>
                    <tr>
                        <th>N°</th>
                        <th>Shot</th>
                        <th>Attribution</th>
                        <th>Prix</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        commands.map((command) => (
                            <tr key={command.id}>
                                <td>
                                    {
                                        command.start === command.end ?
                                            <>{command.start + 1}</> :
                                            <>{`${command.start + 1}-${command.end + 1}`}</>
                                    }
                                </td>
                                <td>{command.product.name}</td>
                                <td>
                                    {
                                        command.member ?
                                            <UserName userId={command.member}/> :
                                            <>Non assigné</>
                                    }
                                </td>
                                <td>{command.price}€</td>
                                <td><a className="delete" onClick={() => this.removeCommand(command.id)}/></td>
                            </tr>
                        ))
                    }
                    {
                        commands.length === 0 &&
                        <tr>
                            <td colSpan={5} className="has-text-centered">Pas encore de shots commandés</td>
                        </tr>
                    }
                    </tbody>
                </table>

                {
                    this.getRemainingCount() > 0 ?
                        <ProductsDisplay preFilter={(product) => product["product_type"] === "SHOT"}
                                         showCommandButton={true}
                                         onCommand={this.onCommand}
                        /> :
                        <h3 className="subtitle is-size-6">Nombre de shooters maximum atteint</h3>
                }

                <Modal onClose={this.closeModal} active={this.state.modalOpened}>
                    <ModalCard>
                        <ModalCardHead onClose={this.closeModal} title="Ajout de shots"/>
                        <ModalCardBody>
                            {
                                this.state.selectedProduct &&
                                <ProductsList>
                                    <ProductsCategory name="SHOT">
                                        <ProductItem product={{
                                            ...this.state.selectedProduct,
                                            name: this.state.selectedProduct.name + " x" + this.state.selectedCount,
                                            price: this.getPriceForCurrentState(),
                                        }}
                                                     selected={true}
                                        />
                                    </ProductsCategory>
                                </ProductsList>
                            }
                            <h2 className="subtitle is-size-5">Quantité à ajouter :</h2>
                            <CountSelector max={this.getRemainingCount()}
                                           onValueChange={(value) => {
                                               this.setState({
                                                   selectedCount: value,
                                               });
                                           }}
                                           value={this.state.selectedCount}
                            />
                            <h2 className="subtitle is-size-5">Commander pour :</h2>
                            <div className="field">
                                <div className="control">
                                    <div className="select">
                                        <select
                                            onChange={(e) => this.setState({selectedMember: e.target.selectedIndex})}
                                            value={this.state.selectedMember}
                                        >
                                            <option key={-1} value={null}>-------------</option>
                                            {this.props.partyMembers.map(member => (
                                                <option key={member}
                                                        value={member}
                                                        selected={this.state.selectedMember === member ? "selected" : undefined}
                                                >
                                                    {this.state.membersNames[member] || "Chargement ...."}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </ModalCardBody>
                        <ModalCardFoot>
                            <button className="button is-success"
                                    disabled={this.getRemainingCount() === 0}
                                    onClick={this.submitCommand}
                            >
                                Ajouter
                            </button>
                            <button className="button" onClick={this.closeModal}>Annuler</button>
                        </ModalCardFoot>
                    </ModalCard>
                </Modal>
            </>
        );
    }

}

SelectShots.propTypes = {
    price: PropTypes.number.isRequired,
    submitContributions: PropTypes.func.isRequired,
    partyMembers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

class CountSelector extends React.Component {

    constructor(props) {
        super(props);

        this.valueChanged = this.valueChanged.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    valueChanged(e) {
        let fieldValue = e.target.value;
        let newValue = Number(fieldValue);
        if (!isNaN(newValue)) {
            if (fieldValue.length === 0) {
                newValue = 1;
            } else if (fieldValue.indexOf(".") !== -1) {
                fieldValue = fieldValue.substring(0, fieldValue.indexOf("."));
                newValue = Number(fieldValue);
            }

            if (newValue < 1) {
                newValue = 1;
            } else if (newValue > this.props.max) {
                newValue = this.props.max;
            }

            this.props.onValueChange(newValue);
        }
    }

    increment() {
        if (this.props.value < this.props.max) {
            this.props.onValueChange(this.props.value + 1);
        }
    }

    decrement() {
        if (this.props.value > 1) {
            this.props.onValueChange(this.props.value - 1);
        }
    }

    render() {
        return (
            <div className="field has-addons">
                <p className="control">
                    <a className="button"
                       disabled={this.props.value <= 1}
                       onClick={this.decrement}
                    >
                        -
                    </a>
                </p>
                <p className="control">
                    <input className="input has-text-centered"
                           type="text"
                           placeholder="1"
                           value={this.props.value}
                           onChange={this.valueChanged}
                    />
                </p>
                <p className="control">
                    <a className="button"
                       disabled={this.props.value >= this.props.max}
                       onClick={this.increment}
                    >
                        +
                    </a>
                </p>
            </div>
        );
    }

}

CountSelector.propType = {
    max: PropTypes.number.isRequired,
    onValueChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
};