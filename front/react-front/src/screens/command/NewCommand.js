import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import {ProductsDisplay} from "../../components/products";
import {Selector, Selectable} from "../../components/selector";
import {fetchProduct, fetchPartyMembers} from "../../api/api";
import UserName from "../../components/UserName";
import PropTypes from "prop-types";
import "aviator";

const isSpecial = (name) => name.toLowerCase().indexOf("plateau") !== -1 && name.toLowerCase().indexOf("shot") !== -1;

export default class NewCommand extends React.Component {

    constructor(props) {
        super(props);
        this.onCommand = this.onCommand.bind(this);
        this.calculatePrices = this.calculatePrices.bind(this);
        this.state = {
            commandProduct: null,
            partyMembers: [],
            participants: [],
            commandPrice: 0,
            pricePerUser: {},
        };
    }

    calculatePrices() {
        this.setState((state, props) => {
            const membersCount = state.participants.length;
            let prices = {};
            let totalPrice = state.commandPrice;
            const pricePerUser = Math.floor(totalPrice / membersCount * 100) / 100;
            state.participants.forEach((pId, i) => {
                let price;
                if (i < membersCount - 1) {
                    price = pricePerUser;
                } else {
                    price = totalPrice;
                }
                totalPrice -= price;
                prices[pId] = price;
            });
            return {
                pricePerUser: prices,
            };
        });
    }

    componentDidMount() {
        this.partyId = Aviator.getCurrentRequest().namedParams.id;
        fetchPartyMembers(this.partyId).then(result => {
            if (result.ok) {
                this.setState({
                    partyMembers: result.members,
                });
            }
        }).catch(console.log);
    }

    onCommand(id) {
        if (id >= 0) {
            fetchProduct(id).then(result => {
                if (result.ok) {
                    this.setState({
                        commandProduct: result.product,
                        commandPrice: result.product.price,
                    });
                }
            }).catch(console.log);
        } else {
            this.setState({
                commandProduct: null,
            });
        }
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
    }

    removeParticipant(id) {
        this.setState((state, props) => ({
            participants: state.participants.filter(pId => pId !== id),
        }));
        this.calculatePrices();
    }

    render() {
        return (
            <>
                <NavBar/>
                <section className="section">
                    <div className="container">
                        <h1 className="title">Nouvelle commande</h1>
                        <h2 className="subtitle is-size-5">1. Sélectionnez ce que vous voulez commander</h2>
                        <ProductsDisplay onProductSelection={this.onCommand}/>
                        {
                            this.state.commandProduct &&
                            <>
                                <h2 className="subtitle is-size-5">
                                    2. Sélectionnez les membres participants à cette commande
                                </h2>
                                <Selector>
                                    {
                                        this.state.partyMembers.map(member => (
                                            <Selectable key={member}
                                                        selected={this.state.participants.includes(member)}
                                                        onSelect={() => this.addParticipant(member)}
                                                        onDeselect={() => this.removeParticipant(member)}
                                            >
                                                <UserName userId={member}/>
                                                {
                                                    this.state.pricePerUser[member] !== undefined &&
                                                    <> ~ {this.state.pricePerUser[member]}€</>
                                                }
                                            </Selectable>
                                        ))
                                    }
                                </Selector>
                            </>
                        }
                    </div>
                </section>
                <Footer/>
            </>
        );
    }

}
