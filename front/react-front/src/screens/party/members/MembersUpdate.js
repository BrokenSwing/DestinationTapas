import React from "react";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Icon from "../../../components/Icon";
import { fetchParty, fetchUserFriends, addMemberToParty, removeMemberFromParty } from "../../../api/api";
import "aviator";
import { Selector, Selectable } from "../../../components/selector";
import UserName from "../../../components/UserName";

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
        this.removeMember = this.removeMember.bind(this);
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
                this.setState((state, props) => {
                    const users = state.users.slice();
                    result.party.members.forEach(memberId => {
                        if(!users.includes(memberId)) {
                            users.push(memberId);
                        }
                    });
                    return {
                        members: result.party.members.slice(),
                        party: result.party,
                        users,
                        unmodifiable,
                    }
                });
            }
        }).catch(console.log);

        fetchUserFriends(localStorage.getItem("userId")).then(result => {
            if(result.ok) {
                this.setState((state, props) => {
                    const users = state.users.slice();
                    result.friends.forEach(friendId => {
                        if(!users.includes(friendId)) {
                            users.push(friendId);
                        }
                    });
                    return {
                        users,
                    };
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
                            {this.state.users.map(id => (
                                <Selectable key={id}
                                            selected={this.state.members.includes(id)}
                                            onSelect={() => this.addMember(id)}
                                            onDeselect={() => this.removeMember(id)}
                                            locked={this.state.unmodifiable.includes(id) || this.state.party && this.state.party.status === "FINISHED"}
                                >
                                    <UserName userId={id} />
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