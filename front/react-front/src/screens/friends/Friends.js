import React from "react";
import Icon from "../../components/Icon";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { fetchUserFriends, addFriend, removeFriend, acceptFriend,
    refuseFriend, findUserIdFromName, cancelFriend } from "../../api/api";
import UserName from "../../components/UserName";

export default class Friends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: [],
            sent: [],
            received: [],
            submitting: false,
            friendName: "",
        };
        this.addFriend = this.addFriend.bind(this);
        this.cancelFriendRequest = this.cancelFriendRequest.bind(this);
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
        this.refuseFriendRequest = this.refuseFriendRequest.bind(this);
        this.deleteFriend = this.deleteFriend.bind(this);
    }

    componentDidMount() {
        fetchUserFriends(localStorage.getItem("userId")).then(result => {
            if (result.ok) {
                this.setState({
                    sent: result.sent_requests,
                    received: result.received_requests,
                    friends: result.friends
                });
            }
        }).catch(console.log);
    }

    addFriend() {
        this.setState({
            submitting: true,
        });
        findUserIdFromName(this.state.friendName).then(result => {
            if(result.ok) {
                addFriend(localStorage.getItem("userId"), result.id).then(result => {
                    this.setState({
                        submitting: false,
                    });
                    if(result.ok) {
                        this.setState({
                            sent: result.sent_requests,
                            received: result.received_requests,
                            friends: result.friends,
                            friendName: "",
                        });
                    }
                }).catch(console.log);
            } else {
                this.setState({
                    submitting: false,
                });
            }
        }).catch(console.log);
    }

    cancelFriendRequest(id) {
        this.setState((state, props) => ({
            sent: state.sent.filter(sentTo => sentTo !== id),
        }));
        cancelFriend(localStorage.getItem("userId"), id).then(result => {
            if(result.ok) {
                this.setState({
                    sent: result.sent_requests,
                    received: result.received_requests,
                    friends: result.friends
                });
            } else {
                this.setState((state, props) => {
                    const sent = state.sent.slice();
                    sent.push(id);
                    return {sent};
                });
            }
        }).catch(console.log);
    }

    acceptFriendRequest(id) {
        this.setState((state, props) => {
            const friends = state.friends.slice();
            friends.push(id);
            return {
                friends,
                received: state.received.filter(receivedId => receivedId !== id),
            };
        });
        acceptFriend(localStorage.getItem("userId"), id).then(result => {
            if(result.ok) {
                this.setState({
                    sent: result.sent_requests,
                    received: result.received_requests,
                    friends: result.friends
                });
            } else {
                this.setState((state, props) => {
                    const received = state.received.slice();
                    received.push(id);
                    return {
                        received,
                        friends: state.friends.filter(friendId => friendId !== id),
                    };
                });
            }
        }).catch(console.log);
    }

    refuseFriendRequest(id) {
        this.setState((state, props) => ({
            received: state.received.filter(receivedId => receivedId !== id),
        }));

        refuseFriend(localStorage.getItem("userId"), id).then(result => {
            if(result.ok) {
                this.setState({
                    sent: result.sent_requests,
                    received: result.received_requests,
                    friends: result.friends
                });
            } else {
                this.setState((state, props) => {
                    const received = state.received.slice();
                    received.push(id);
                    return {
                        received,
                    };
                })
            }
        }).catch(console.log);
    }

    deleteFriend(id) {
        this.setState((state, props) => ({
            friends: state.friends.filter(friendId => friendId !== id),
        }));

        removeFriend(localStorage.getItem("userId"), id).then(result => {
            if(result.ok) {
                this.setState({
                    sent: result.sent_requests,
                    received: result.received_requests,
                    friends: result.friends
                });
            } else {
                this.setState((state, props) => {
                    const friends = state.friends.slice();
                    friends.push(id);
                    return {
                        friends,
                    };
                })
            }
        }).catch(console.log);
    }

    render() {
        return (
            <>
                <NavBar/>
                <section className="section">
                    <div className="container">
                        <h1 className="title is-4">Amis</h1>

                        <h2 className="subtitle">Ajouter un ami</h2>
                        <div className="field has-addons">
                            <div className="control has-icons-left">
                                <Icon iconName="search" iconClasses="is-left"/>
                                <input className="input" type="text" placeholder="Pseudo" value={this.state.friendName}
                                        onChange={(e) => this.setState({friendName: e.target.value})}
                                />
                            </div>
                            <div className="control">
                                <a className="button is-link"
                                   disabled={this.state.submitting || this.state.friendName.length === 0}
                                   onClick={this.addFriend}
                                >
                                    {this.state.submitting ? "Envoie ..." : "Ajouter"}
                                </a>
                            </div>
                        </div>

                        <h2 className="subtitle">Demandes reçues : </h2>

                        {
                            this.state.received.length === 0 &&
                                <h3 className="has-text-centered subtitle is-size-6">Pas de demandes</h3>
                        }

                        {this.state.received.map(id => (
                            <ReceivedRequest key={id}
                                             from={id}
                                             accept={this.acceptFriendRequest}
                                             refuse={this.refuseFriendRequest}
                            />
                        ))}

                        <h2 className="subtitle">Demandes envoyées : </h2>

                        {
                            this.state.sent.length === 0 &&
                                <h3 className="has-text-centered subtitle is-size-6">Pas de demandes</h3>
                        }

                        {this.state.sent.map(id => (
                            <SentRequest key={id} to={id} cancel={this.cancelFriendRequest}/>
                        ))}

                        <h2 className="subtitle">Amis : </h2>

                        {
                            this.state.friends.length === 0 &&
                                <h3 className="has-text-centered subtitle is-size-6">Pas d'amis</h3>
                        }

                        {this.state.friends.map(id => (
                            <Friend key={id} userId={id} remove={this.deleteFriend} />
                        ))}

                    </div>
                </section>
                <Footer/>
            </>
        );
    }
}

const ReceivedRequest = ({from, accept, refuse}) => (
    <div className="box">
        <div className="columns is-mobile">
            <div className="column">
                <div className="field has-icons-left">
                    <Icon iconName="user" iconClasses="is-left"/>
                    <span><UserName userId={from}/></span>
                </div>
            </div>
            <div className="column">
                <div className="field is-grouped">
                    <p className="control" onClick={() => accept(from)}>
                        <a className="button is-success is-small">Accepter</a>
                    </p>
                    <p className="control" onClick={() => refuse(from)}>
                        <a className="button is-danger is-small">Refuser</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
);

const SentRequest = ({to, cancel}) => (
    <div className="box">
        <div className="columns is-mobile">
            <div className="column">
                <div className="field has-icons-left">
                    <Icon iconName="user-plus" iconClasses="is-left"/>
                    <span><UserName userId={to}/></span>
                </div>
            </div>
            <div className="column">
                <p className="control has-text-right">
                    <a className="button is-danger is-small" onClick={() => cancel(to)}>Annuler</a>
                </p>
            </div>
        </div>
    </div>
);

const Friend = ({userId, remove}) => (
    <div className="box">
        <div className="columns is-mobile">
            <div className="column">
                <div className="field has-icons-left">
                    <Icon iconName="user-friends" iconClasses="is-left"/>
                    <span><UserName userId={userId} /></span>
                </div>
            </div>
            <div className="column">
                <p className="control has-text-right">
                    <a className="button is-danger is-small" onClick={() => remove(userId)}>Supprimer</a>
                </p>
            </div>
        </div>
    </div>
);