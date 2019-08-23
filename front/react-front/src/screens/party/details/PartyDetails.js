import React from "react";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import Icon from "../../../components/Icon";
import "aviator";
import {fetchCommand, fetchParty, finishParty} from "../../../api/api";
import UserName from "../../../components/UserName";
import {Modal, ModalCardFoot, ModalCard, ModalCardBody, ModalCardHead} from "../../../components/modals";
import ProductName from "../../../components/ProductName";
import Link from "../../../components/Link";

const smooth = (price) => Math.round(price * 100) / 100;

export default class PartyDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            party: null,
        };
        this.closeParty = this.closeParty.bind(this);
    }

    componentDidMount() {
        this.partyId = Aviator.getCurrentRequest().namedParams.id;
        fetchParty(this.partyId).then(result => {
            if (result.ok) {
                this.setState({
                    party: result.party,
                });
            }
        }).catch(console.log);
    }

    closeParty() {
        if (this.state.party.status === "IN PROGRESS") {
            this.setState((state) => ({
                party: {...state.party, status: "FINISHED"},
            }));
            finishParty(this.partyId).then(result => {
                if (result.ok) {
                    this.setState({
                        party: result.party,
                    });
                } else {
                    this.setState((state) => ({
                        party: {...state.party, status: "IN PROGRESS"}
                    }));
                }
            }).catch(console.log);
        }
    }

    render() {
        const modal = (<PartyRecap party={this.state.party} close={this.closeParty}/>);
        return (
            <>
                <NavBar/>
                <section className="section">
                    <div className="container">
                        <a className="is-link navigate" href={Aviator.hrefFor("/parties")}>
                            <Icon iconName="arrow-left" iconClasses="is-small"/><span>Retour</span>
                        </a>
                        <h1 className="title">Détail de la soirée</h1>

                        {
                            this.state.party &&
                            <>

                                <div className="field has-text-centered">
                                    <a className="button is-fullwidth navigate"
                                       href={Aviator.hrefFor("/parties/:id/members", this.partyId)}>
                                        <Icon iconName="users" iconClasses="is-small"/>
                                        <span>Participants ({this.state.party.members.length})</span>
                                    </a>
                                </div>

                                <div className="field has-text-centered">
                                    <Link className="button is-link is-fullwidth"
                                          disabled={
                                              this.state.party.status === "FINISHED" ||
                                              !this.state.party.members.includes(Number(localStorage.getItem("userId")))
                                          }
                                          href={Aviator.hrefFor("/parties/:id/new-command", {namedParams: {id: this.partyId}})}
                                    >
                                        Nouvelle commande
                                    </Link>
                                </div>

                                <h2 className="subtitle">Commandes :</h2>

                                {this.state.party.commands.map(commandId => (
                                    <Command key={commandId}
                                             commandId={commandId}
                                             onClick={() => Aviator.navigate("/parties/:id/commands/:command/", {
                                                 namedParams: {
                                                     id: this.partyId,
                                                     command: commandId,
                                                 },
                                             })}
                                    />
                                ))}

                                {
                                    this.state.party.commands.length === 0 &&
                                    <h3 className="has-text-centered subtitle is-size-6">Pas de commandes</h3>
                                }
                            </>
                        }
                        {modal}
                    </div>
                </section>
                <Footer/>
            </>
        );
    }

}

class Command extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            command: null,
        };
    }

    componentDidMount() {
        fetchCommand(this.props.commandId).then(result => {
            if (result.ok) {
                this.setState({
                    command: result.command,
                });
            }
        }).catch(console.log);
    }

    render() {
        if (this.state.command === null) {
            return null;
        }
        const {commandId, ...props} = this.props;
        return (
            <div className="box" {...props}>
                <div className="columns is-mobile">
                    <div className="column">
                        <strong><ProductName productId={this.state.command.product}/></strong>
                    </div>
                    <div className="column has-text-right">
                        Prix : {this.state.command.total_price}€ <br/>
                        {this.state.command.participants.length}
                        <Icon iconName="user"/>
                    </div>
                </div>
            </div>
        );
    }
}

class PartyRecap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            submitting: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    closeModal() {
        this.setState({
            opened: false,
        });
    }

    openModal() {
        this.setState({
            opened: true,
        });
    }

    render() {
        if (!this.props.party) {
            return null;
        }
        const cantModify =
            this.props.party.status === "FINISHED" ||
            !this.props.party.members.includes(Number(localStorage.getItem("userId"))) ||
            this.props.party.leader !== Number(localStorage.getItem("userId"));
        return (
            <>
                <div className="field has-text-centered">
                    <a className="button is-link is-fullwidth" onClick={this.openModal}>
                        <Icon iconName="receipt" iconClasses="is-small"/>
                        <span>Addition</span>
                    </a>
                </div>

                <Modal active={this.state.opened} onClose={this.closeModal}>
                    <ModalCard>
                        <ModalCardHead title="La punition" onClose={this.closeModal}/>

                        <ModalCardBody>
                            <div className="table-container">
                                <table className="table is-striped is-fullwidth">
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th className="has-text-right">Prix</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.party.members.map(memberId => (
                                            <tr key={memberId}>
                                                <td><UserName userId={memberId}/></td>
                                                <td className="has-text-right">{
                                                    this.props.party.price_per_user.filter(r => r.user === memberId).length ?
                                                        smooth(this.props.party.price_per_user.filter(r => r.user === memberId)[0].total) : "0"
                                                }€
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    {
                                        this.props.party.price_per_user.filter(r => r.user === null)[0] &&
                                        <tr>
                                            <td>Non assigné</td>
                                            <td className="has-text-right">
                                                {smooth(this.props.party.price_per_user.filter(r => r.user === null)[0].total)}€
                                            </td>
                                        </tr>

                                    }
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>Total</th>
                                        <th className="has-text-right">{smooth(this.props.party.total_price)}€</th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </ModalCardBody>

                        <ModalCardFoot>
                            <button className="button is-success"
                                    disabled={cantModify}
                                    onClick={this.props.close}
                            >
                                Terminer la soirée
                            </button>
                            <button className="button" onClick={this.closeModal}>Annuler</button>
                        </ModalCardFoot>
                    </ModalCard>
                </Modal>
            </>
        );
    }

}