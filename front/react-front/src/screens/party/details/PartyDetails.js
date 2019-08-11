import React from "react";
import Footer from "../../../components/Footer";
import NavBar from "../../../components/NavBar";
import Icon from "../../../components/Icon";
import "aviator";
import {fetchCommand, fetchParty} from "../../../api/api";
import UserName from "../../../components/UserName";

export default class PartyDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            party: null,
        };
    }

    componentDidMount() {
        const partyId = Aviator.getCurrentRequest().namedParams.id;
        fetchParty(partyId).then(result => {
            if(result.ok) {
                this.setState({
                    party: result.party,
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const modal = (<PartyRecap party={this.state.party} />);
        return (
          <>
            <NavBar />
            <section className="section">
                <div className="container">
                    <h1 className="title">Détail de la soirée</h1>

                    {
                        this.state.party &&
                    <>

                        <div className="field has-text-centered">
                            <a className="button is-fullwidth">
                                <Icon iconName="users" iconClasses="is-small" />
                                <span>Participants ({this.state.party.members.length})</span>
                            </a>
                        </div>

                        <div className="field has-text-centered">
                            <a className="button is-link is-fullwidth" disabled={this.state.party.status === "FINISHED"}>
                                Nouvelle commande
                            </a>
                        </div>

                        <h2 className="subtitle">Commandes :</h2>

                        {this.state.party.commands.map(commandId => (
                            <Command key={commandId} commandId={commandId} />
                        ))}
                    </>
                    }
                    {modal}
                </div>
            </section>
            <Footer />
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
            if(result.ok) {
                this.setState({
                    command: result.command,
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        if(this.state.command === null) {
            return null;
        }
        return (
            <div className="box">
                <div className="columns is-mobile">
                    <div className="column">
                        <strong>{this.state.command.product.name}</strong>
                    </div>
                    <div className="column has-text-right">
                        Prix : {this.state.command.total_price}€ <br/>
                        {this.state.command.contributions.length}
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
        if(!this.props.party) {
            return null;
        }
        const finished = this.props.party.status === "FINISHED";
        return (
        <>
           <div className="field has-text-centered">
                <a className="button is-link is-fullwidth" onClick={this.openModal}>
                    <Icon iconName="receipt" iconClasses="is-small" />
                    <span>Addition</span>
                </a>
            </div>

            <div className={"modal " + (this.state.opened ? "is-active" : "")}>
                <div className="modal-background" onClick={this.closeModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title has-text-centered">La punition</p>
                        <button className="delete" aria-label="close" onClick={this.closeModal} />
                    </header>

                    <section className="modal-card-body">
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
                                            <td><UserName userId={memberId} /></td>
                                            <td className="has-text-right">{
                                                this.props.party.price_per_user.filter(r => r.user === memberId).length ?
                                                    this.props.party.price_per_user.filter(r => r.user === memberId)[0].total : "0"
                                            }€</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <footer className="modal-card-foot">
                        <button className="button is-success" disabled={finished}>Terminer la soirée</button>
                        <button className="button" onClick={this.closeModal}>Annuler</button>
                    </footer>
                </div>
            </div>
        </>
        );
    }

}