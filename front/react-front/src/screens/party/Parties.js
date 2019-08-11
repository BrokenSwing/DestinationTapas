import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Icon from "../../components/Icon";
import { fetchAllParties, createParty } from "../../api/api";
import "aviator";

export default class Parties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parties: null,
            submitting: false,
        };
        this.createNewParty = this.createNewParty.bind(this);
    }

    createNewParty() {
        this.setState({
            submitting: true,
        });
        createParty().then(result => {
            this.setState({
                submitting: false
            });
            if(result.ok) {
                Aviator.navigate("/parties/:id", { namedParams: { id: result.party.id }});
            }
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidMount() {
        fetchAllParties().then(result => {
           if(result.ok) {
               this.setState({
                   parties: result.parties
               })
           }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <>
               <NavBar />
                <section className="section">
                    <div className="container">
                        <h1 className="title">Vos soirées</h1>
                        <div className="columns">
                            <div className="column">
                                <a className="button is-link is-rounded is-focused"
                                   disabled={this.state.submitting}
                                   onClick={this.createNewParty}
                                >
                                    Commencer une nouvelle soirée
                                </a>
                            </div>
                        </div>

                        <h2 className="subtitle">En cours</h2>

                        {
                            this.state.parties === null ? '' :
                                this.state.parties.filter(party => party.status === "IN PROGRESS")
                                    .sort((first, second) => new Date(first.date).getTime() < new Date(second.date).getTime())
                                    .map(party => (
                                        <PartyDisplay key={party.id} party={party}/>
                                    ))
                        }

                        <h2 className="subtitle">Historique</h2>

                        {
                            this.state.parties === null ? '' :
                                this.state.parties.filter(party => party.status === "FINISHED")
                                    .sort((first, second) => new Date(first.date).getTime() < new Date(second.date).getTime())
                                    .map(party => (
                                        <PartyDisplay key={party.id} party={party} />
                                    ))
                        }

                    </div>
                </section>
               <Footer />
            </>
        );
    }

}

const STATUS_MAPPING = {
    "IN PROGRESS": "En cours",
    "FINISHED": "Terminée"
};

const PartyDisplay = ({party}) => {
    const date = new Date(party.date);
    return (
        <div className="box" onClick={() => Aviator.navigate("/parties/:id/", { namedParams: { id: party.id }})}>
            <div className="columns is-mobile">
                <div className="column">
                    <strong>{date.toLocaleDateString("fr")}</strong> <br />
                    {STATUS_MAPPING[party.status]}
                </div>
                <div className="column has-text-right">
                    Total : {party.total_price}€
                    <br/>
                    {party.members.length}
                    <Icon iconName="user" />
                </div>
            </div>
            {
                party.status === "IN PROGRESS" && Date.now() - date.getTime() > 3 * 24 * 3600 * 1000 &&
                <div className="notification is-warning">
                    Cette soirée semble terminée, pensez à la fermer
                </div>
            }
        </div>
    );
};