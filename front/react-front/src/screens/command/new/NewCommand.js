import React from "react";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import {fetchProduct, fetchPartyMembers, createCommandForParty} from "../../../api/api";
import "aviator";
import ChooseProduct from "./ChooseProduct";
import SelectContributions from "./SelectContributions";
import Icon from "../../../components/Icon";

export default class NewCommand extends React.Component {

    constructor(props) {
        super(props);
        this.onCommand = this.onCommand.bind(this);
        this.backToProductChoice = this.backToProductChoice.bind(this);
        this.submit = this.submit.bind(this);
        this.setContributions = this.setContributions.bind(this);
        this.state = {
            commandProduct: null,
            partyMembers: [],
            commandPrice: 0,
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
                        {!this.state.commandProduct && <ChooseProduct onCommand={this.onCommand}/>}
                        {
                            this.state.commandProduct &&
                            <>
                                <SelectContributions product={this.state.commandProduct}
                                                     partyMembers={this.state.partyMembers}
                                                     back={this.backToProductChoice}
                                                     submitContributions={this.setContributions}
                                />

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
