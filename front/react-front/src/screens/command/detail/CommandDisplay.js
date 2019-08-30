import React from "react";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Icon from "../../../components/Icon";
import "aviator";
import {fetchCommand} from "../../../api/specific/commands";
import {fetchProduct} from "../../../api/specific/products";
import {ProductItem, ProductsCategory, ProductsList} from "../../../components/products";
import BasicContributionsDisplay from "./BasicContributionsDisplay";
import ShotsContributionsDisplay from "./ShotsContributionsDisplay";

const displayShots = (product) => product.name === "Plateau de shooters";

export default class CommandDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            command: null,
            product: null,
        };
    }

    componentDidMount() {
        this.partyId = Aviator.getCurrentRequest().namedParams.id;
        this.commandId = Aviator.getCurrentRequest().namedParams.command;
        fetchCommand(this.commandId).then(result => {
            if (result.ok) {
                this.setState({
                    command: result.command,
                });
                fetchProduct(result.command.product).then(result => {
                    if (result.ok) {
                        this.setState({
                            product: result.product,
                        });
                    }
                }).catch(console.log);
            }
        }).catch(console.log);
    }

    render() {
        return (
            <>
                <a className="is-link navigate"
                   href={Aviator.hrefFor("/parties/:id/", {
                       namedParams: {
                           id: Aviator.getCurrentRequest().namedParams.id
                       }
                   })}
                >
                    <Icon iconName="arrow-left" iconClasses="is-small"/><span>Retour</span>
                </a>
                <h1 className="title">
                    Détail de la commande
                </h1>

                <ProductsList>
                    <ProductsCategory name="Choisis">
                        {
                            this.state.product &&
                            <ProductItem
                                product={{...this.state.product, price: this.state.command.total_price}}
                                selected={true}
                            />
                        }
                    </ProductsCategory>
                </ProductsList>


                <h2 className="subtitle is-size-5">Participants</h2>

                {
                    this.state.product && (
                        displayShots(this.state.product) ?
                            <ShotsContributionsDisplay contributions={this.state.command.contributions}/> :
                            <BasicContributionsDisplay contributions={this.state.command.contributions}/>
                    )
                }
            </>
        );
    }

}