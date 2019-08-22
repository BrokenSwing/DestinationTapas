import React from "react";
import {ModalCard, Modal, ModalCardHead, ModalCardBody, ModalCardFoot} from "../../../components/modals";
import {ProductItem, ProductsCategory, ProductsDisplay, ProductsList} from "../../../components/products";
import {fetchProduct} from "../../../api/specific/products";
import PropTypes from "prop-types";
import ProductName from "../../../components/ProductName";
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

        this.state = {
            modalOpened: false,
            selectedProduct: null,
            selectedCount: 1,
            selectedMember: 0,

            prices: this.calculatePrices(),
            membersNames: {},
            commands: [],
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
        }
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
                const commands = state.commands;
                commands.push({
                    count,
                    product,
                    member,
                });
                return {
                    commands,
                };
            });
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

    getRemainingCount() {
        return 14 - this.state.commands.map(c => c.count).reduce((a, b) => a + b, 0);
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

    render() {
        return (
            <>
                <h2 className="subtitle is-size-5">
                    3. Sélectionnez les shooters que vous souhaitez
                </h2>

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