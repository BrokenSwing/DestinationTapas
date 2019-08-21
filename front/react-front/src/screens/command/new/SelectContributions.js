import React from "react";
import PropTypes from "prop-types";
import {Selectable, Selector, SelectorData} from "../../../components/selector";
import UserName from "../../../components/UserName";
import {ProductType} from "../../../api/types";

export default class SelectContributions extends React.Component {

    constructor(props) {
        super(props);

        this.addParticipant = this.addParticipant.bind(this);
        this.removeParticipant = this.removeParticipant.bind(this);
        this.calculatePrices = this.calculatePrices.bind(this);
        this.submit = this.submit.bind(this);
        this.calculatePricesFrom = this.calculatePricesFrom.bind(this);

        this.state = {
            participants: [],
            pricePerUser: {},
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.price !== this.props.price) {
            this.calculatePrices();
        }
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

    calculatePricesFrom(state, props) {
        const membersCount = state.participants.length;

        if (membersCount === 0) {
            return {
                pricePerUser: {},
            };
        }

        let prices = {};
        let totalPrice = props.price;
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
    }

    calculatePrices() {
        this.setState((state, props) => this.calculatePricesFrom(state, props));
    }

    render() {
        return (
            <>
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
    product: ProductType.isRequired,
    price: PropTypes.number.isRequired,
    partyMembers: PropTypes.arrayOf(PropTypes.number).isRequired,
    submitContributions: PropTypes.func.isRequired,
};