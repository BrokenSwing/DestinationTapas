import React from "react";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import {fetchProduct, fetchPartyMembers, createCommandForParty} from "../../../api";
import "aviator";
import SelectContributions from "./SelectContributions";
import Icon from "../../../components/Icon";
import {ProductItem, ProductsCategory, ProductsDisplay, ProductsList} from "../../../components/products";
import SelectShots from "./SelectShots";

const needShotsSelection = (product) => product.name === "Plateau de shooters";

export default class NewCommand extends React.Component {

    constructor(props) {
        super(props);
        this.onCommand = this.onCommand.bind(this);
        this.backToProductChoice = this.backToProductChoice.bind(this);
        this.submit = this.submit.bind(this);
        this.setContributions = this.setContributions.bind(this);
        this.onPriceChange = this.onPriceChange.bind(this);
        this.state = {
            commandProduct: null,
            partyMembers: [],
            productPrice: 0,
            priceFieldValue: 0,
            contributions: [],
        };
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

    onPriceChange(e) {
        let fieldValue = e.target.value;
        let newValue = Number(fieldValue);
        if (!isNaN(newValue) && newValue >= 0) {
            if (fieldValue.length === 0) {
                newValue = this.state.commandProduct.price;
            } else if (Math.floor(newValue * 100) !== newValue * 100) {
                newValue = Math.floor(newValue * 100) / 100;
                fieldValue = newValue;
            }

            this.setState({
                productPrice: newValue,
                priceFieldValue: fieldValue,
            });
        }
    }

    onCommand(id) {
        if (id >= 0) {
            fetchProduct(id).then(result => {
                if (result.ok) {
                    this.setState({
                        commandProduct: result.product,
                        productPrice: result.product.price,
                        priceFieldValue: result.product.price,
                    });
                }
            }).catch(console.log);
        } else {
            this.setState({
                commandProduct: null,
            });
        }
    }

    backToProductChoice() {
        this.setState({
            commandProduct: null,
            contributions: [],
        });
    }

    setContributions(contributions) {
        this.setState({
            contributions,
        });
    }

    submit() {
        createCommandForParty(this.partyId, {
            product: this.state.commandProduct.id,
            contributions: this.state.contributions,
        }).then(result => {
            if (result.ok) {
                Aviator.navigate("/parties/:id/commands/:command/", {
                    namedParams: {
                        id: this.partyId,
                        command: result.command.id,
                    },
                });
            }
        }).catch(console.log);
    }

    render() {
        return (
            <>
                <NavBar/>
                <section className="section">
                    <div className="container">
                        <a className="is-link navigate"
                           href={Aviator.hrefFor("/parties/:id/", {namedParams: {id: this.partyId}})}
                        >
                            <Icon iconName="arrow-left" iconClasses="is-small"/><span>Retour</span>
                        </a>
                        <h1 className="title">Nouvelle commande</h1>
                        <h2 className="subtitle is-size-5">1. Sélectionnez ce que vous voulez commander</h2>
                        {
                            !this.state.commandProduct &&
                            <ProductsDisplay showCommandButton={true} onCommand={this.onCommand}/>
                        }
                        {
                            this.state.commandProduct &&
                            <>
                                <ProductsList>
                                    <ProductsCategory name="Choisis">
                                        <ProductItem
                                            product={{...this.state.commandProduct, price: this.state.productPrice}}
                                            selected={true}
                                            onSelect={this.backToProductChoice}
                                        />
                                    </ProductsCategory>
                                </ProductsList>

                                <h2 className="subtitle is-size-5">2. Changez le prix si celui-ci n'est pas valide</h2>

                                <div className="field has-addons">
                                    <div className="control">
                                        <input className="input has-text-right"
                                               name="price"
                                               type="text"
                                               placeholder={this.state.commandProduct.price}
                                               value={this.state.priceFieldValue}
                                               onChange={this.onPriceChange}
                                        />
                                    </div>
                                    <p className="control">
                                        <a className="button is-static">€</a>
                                    </p>
                                </div>

                                {
                                    needShotsSelection(this.state.commandProduct) ?
                                        <SelectShots
                                            price={this.state.productPrice}
                                            submitContributions={this.setContributions}
                                            partyMembers={this.state.partyMembers}
                                        /> :
                                        <SelectContributions product={this.state.commandProduct}
                                                             price={this.state.productPrice}
                                                             partyMembers={this.state.partyMembers}
                                                             submitContributions={this.setContributions}
                                        />
                                }

                                <h2 className="subtitle is-size-5">4. Validez votre commande</h2>

                                <div className="field is-grouped">
                                    <p className="control">
                                        <a className="button is-primary"
                                           disabled={this.state.contributions.length === 0}
                                           onClick={this.submit}
                                        >
                                            Confirmer
                                        </a>
                                    </p>
                                    <p className="control">
                                        <a className="button is-light navigate"
                                           href={Aviator.hrefFor("/parties/:id/", {namedParams: {id: this.partyId}})}
                                        >
                                            Annuler
                                        </a>
                                    </p>
                                </div>
                            </>
                        }
                    </div>
                </section>
                <Footer/>
            </>
        );
    }

}
