import React from "react";
import PropTypes from "prop-types";
import {Selectable, Selector, SelectorData} from "../../../components/selector";
import UserName from "../../../components/UserName";
import {ProductType} from "../../../api/types";
import {ProductsList, ProductItem, ProductsCategory} from "../../../components/products";

export default class SelectContributions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            participants: [],
            productPrice: this.props.product.price,
            priceFieldValue: this.props.product.price,
            pricePerUser: {},
        };
        this.addParticipant = this.addParticipant.bind(this);
        this.removeParticipant = this.removeParticipant.bind(this);
        this.calculatePrices = this.calculatePrices.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit() {
        this.setState((state, props) => {
            const contributions = [];
            state.participants.forEach(p => {
                contributions.push({
                    user: p,
                    product: this.props.product.id,
                    part: state.pricePerUser[p],
                });
            });
            this.props.submitContributions(contributions);
            return {};
        });
    }

    addParticipant(id) {
        this.setState((state, props) => {
            const participants = state.participants.slice();
            participants.push(id);
            return {
                participants,
            };
        });
        this.calculatePrices();
        this.submit();
    }

    removeParticipant(id) {
        this.setState((state, props) => ({
            participants: state.participants.filter(pId => pId !== id),
        }));
        this.calculatePrices();
        this.submit();
    }

    calculatePrices() {
        this.setState((state, props) => {
            const membersCount = state.participants.length;

            if (membersCount === 0) {
                return {
                    pricePerUser: {},
                };
            }

            let prices = {};
            let totalPrice = state.productPrice;
            const pricePerUser = Math.floor(totalPrice / membersCount * 100) / 100;
            state.participants.forEach((pId, i) => {
                let price;
                if (i < membersCount - 1) {
                    price = pricePerUser;
                } else {
                    price = totalPrice;
                }
                // Seems to be necessary to fix floating point rounding issue due to previous subs
                price = Math.round(price * 100) / 100;
                totalPrice -= price;
                prices[pId] = price;
            });
            return {
                pricePerUser: prices,
            };
        });
    }

    onPriceChange(e) {
        let fieldValue = e.target.value;
        let newValue = Number(fieldValue);
        if(!isNaN(newValue) && newValue >= 0) {
            if(Math.floor(newValue * 100) !== newValue * 100) {
                newValue = Math.floor(newValue * 100) / 100;
                fieldValue = newValue;
            }

            this.setState({
                productPrice: newValue,
                priceFieldValue: fieldValue,
            });
            this.calculatePrices();
            this.submit();
        }
    }

    render() {
        return (
            <>
                <h2 className="subtitle is-size-5">1. Sélectionnez ce que vous voulez commander</h2>

                <ProductsList>
                    <ProductsCategory name="Choisis">
                        <ProductItem product={{...this.props.product, price: this.state.productPrice}}
                                     selected={true}
                                     onSelect={this.props.back}
                        />
                    </ProductsCategory>
                </ProductsList>

                <h2 className="subtitle is-size-5">2. Changez le prix si celui-ci n'est pas valide</h2>

                <div className="field has-addons">
                    <div className="control">
                        <input className="input has-text-right"
                               name="price"
                               type="text"
                               placeholder={this.props.product.price}
                               value={this.state.priceFieldValue}
                               onChange={this.onPriceChange}
                        />
                    </div>
                    <p className="control">
                        <a className="button is-static">€</a>
                    </p>
                </div>

                <h2 className="subtitle is-size-5">
                    3. Sélectionnez les membres participants à cette commande
                </h2>

                <Selector>
                    {
                        this.props.partyMembers.map(member => (
                            <Selectable key={member}
                                        selected={this.state.participants.includes(member)}
                                        onSelect={() => this.addParticipant(member)}
                                        onDeselect={() => this.removeParticipant(member)}
                            >
                                <SelectorData>
                                    <UserName userId={member}/>
                                </SelectorData>
                                <SelectorData>
                                    {
                                        this.state.pricePerUser[member] !== undefined ?
                                            <>{this.state.pricePerUser[member]}€</> :
                                            <span className="icon"/>
                                    }
                                </SelectorData>
                            </Selectable>
                        ))
                    }
                </Selector>
            </>
        );
    }

}

SelectContributions.propTypes = {
    partyMembers: PropTypes.arrayOf(PropTypes.number).isRequired,
    product: ProductType.isRequired,
    back: PropTypes.func.isRequired,
    submitContributions: PropTypes.func.isRequired,
};