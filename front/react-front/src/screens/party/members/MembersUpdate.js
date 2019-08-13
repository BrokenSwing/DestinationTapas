import React from "react";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Icon from "../../../components/Icon";
import { fetchParty, fetchAllUsers, addMemberToParty, removeMemberFromParty } from "../../../api/api";
import "aviator";
import { Selector, Selectable } from "../../../components/selector";

export default class MembersUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            members: [],
            users: [],
            unmodifiable: [],
            party: null,
        };
        this.addMember = this.addMember.bind(this);
    }

    addMember(id) {
        if(this.state.party && this.state.party.status === "FINISHED") {
            return;
        }

        this.setState((state, props) => {
            const members = state.members.slice();
            members.push(id);
            return {
                members: members,
            }
        });

        addMemberToParty(this.partyId, id).then(result => {
            if(result.ok) {
                this.setState({
                    members: result.members,
                });
            } else {
                this.setState((state, props) => ({
                    members: state.members.filter(memberId => memberId !== id),
                }));
            }
        }).catch(console.log);
    }

    removeMember(id) {
        if(this.state.unmodifiable.includes(id) || this.state.party && this.state.party.status === "FINISHED") {
            return;
        }

        this.setState((state, props) => ({
            members: state.members.filter(memberId => memberId !== id),
        }));

        removeMemberFromParty(this.partyId, id).then(result => {
            if(result.ok) {
                this.setState({
                    members: result.members,
                });
            } else {
                this.setState((state, props) => {
                    const members = state.members.slice();
                    members.push(id);
                    return {
                        members: members,
                    }
                });
            }
        }).catch(console.log);
    }

    componentDidMount() {
        this.partyId = Aviator.getCurrentRequest().namedParams.id;

        fetchParty(this.partyId).then(result => {
            if(result.ok) {
                const unmodifiable = [];
                result.party["price_per_user"].forEach(o => unmodifiable.push(o.user));
                if(!unmodifiable.includes(result.party.leader)) {
                    unmodifiable.push(result.party.leader);
                }
                this.setState({
                    members: result.party.members.slice(),
                    party: result.party,
                    unmodifiable,
                });
            }
        }).catch(console.log);

        fetchAllUsers().then(result => {
            if(result.ok) {
                if(result.users.length > 1) {
                    result.users = result.users.sort((first, second) => first.username.localeCompare(second.username));
                }
                this.setState({
                    users: result.users,
                });
            }
        }).then(console.log);

    }

    render() {
        return (
            <>
                <NavBar />
                <section className="section">
                    <div className="container">
                        <a className="is-link navigate" href={Aviator.hrefFor(`/parties/${this.partyId}`)}>
                            <Icon iconName="arrow-left" iconClasses="is-small" /><span>Retour</span>
                        </a>
                        <h1 className="title">Participants ({this.state.members.length})</h1>

                        <Selector>
                            {this.state.users.map(user => (
                                <Selectable key={user.id}
                                            selected={this.state.members.includes(user.id)}
                                            onSelect={() => this.addMember(user.id)}
                                            onDeselect={() => this.removeMember(user.id)}
                                            locked={this.state.unmodifiable.includes(user.id) || this.state.party && this.state.party.status === "FINISHED"}
                                >
                                    {user.username}
                                </Selectable>
                            ))}
                        </Selector>

                    </div>
                </section>
                <Footer />
            </>
        );
    }
}