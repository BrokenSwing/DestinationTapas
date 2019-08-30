import React from 'react';
import "./style.sass";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import 'aviator'
import {render, isConnected, requiresAuth} from "./routing";
import {Helmet} from "react-helmet";
import ErrorBoundary from "./components/ErrorBoundary";
import SectionWithContainer from "./components/SectionWithContainer";
import * as api from "./api"

class Navigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: <></>,
        };
    }

    componentDidMount() {
        Aviator.setRoutes({
            target: this,
            '/': "mainPage",
            '/auth': "authPage",
            '/products': "productsPage",
            '/friends': "friendsPage",
            '/profile': "profilePage",

            '/parties': {
                target: this,
                "/": "partiesPage",
                "/:id": {
                    target: this,
                    "/": "partyDetailPage",
                    "/members": "partyMembersPage",
                    "/new-command": "newCommandPage",
                    "/commands": {
                        target: this,
                        "/:command": "commandDetailPage"
                    }
                }
            }
        });
        Aviator.dispatch();
        Aviator.refresh();
    }

    fetchModule(importStatement, cb) {
        importStatement.then(({default: Component}) => {
            cb(Component);
        }).catch(() => this.setState({
            content: null,
        }));
    };

    mainPage() {
        this.fetchModule(import(/* webpackChunkName: "App" */ "./App"),
            App => this.setState({
                content: <App/>
            })
        );
    }

    authPage(request) {
        if (isConnected()) {
            if (request.queryParams.redirect) {
                Aviator.navigate(request.queryParams.redirect)
            } else {
                Aviator.navigate("/");
            }
        } else {
            this.fetchModule(import(/* webpackChunkName: "Auth" */ "./screens/auth/Auth"),
                Auth => this.setState({
                    content: <Auth/>
                }));
        }
    }

    productsPage() {
        this.fetchModule(import(/* webpackChunkName: "Products" */ "./screens/products/Products"),
            Products => this.setState({
                content: <Products/>,
            }))
    }

    friendsPage() {
        this.fetchModule(import(/* webpackChunkName: "Friends" */ "./screens/friends/Friends"), Friends => {
            requiresAuth(() => {
                api.fetchUserFriends(api.getConnectedUser()).then(result => {
                }).catch((err) => console.log(`Unable to connect to Internet. Error: ${err}`))
            });
            this.setState({
                content: <Friends/>
            });
        });
    }

    profilePage() {
        this.fetchModule(import(/* webpackChunkName: "Profile" */ "./screens/profile/Profile"),
            Profile => this.setState({
                content: <Profile/>,
            }));
    }

    partiesPage() {
        this.fetchModule(import(/* webpackChunkName: "Parties" */ "./screens/party/Parties"),
            Parties => this.setState({
                content: <Parties/>,
            }));
    }

    partyDetailPage() {
        this.fetchModule(import(/* webpackChunkName: "PartyDetail" */ "./screens/party/details/PartyDetails"),
            PartyDetails => this.setState({
                content: <PartyDetails/>,
            }));
    }

    partyMembersPage() {
        this.fetchModule(import(/* webpackChunkName: "PartyMembers" */ "./screens/party/members/MembersUpdate"),
            PartyMembers => this.setState({
                content: <PartyMembers/>,
            }));
    }

    newCommandPage() {
        this.fetchModule(import(/* webpackChunkName: "NewCommand" */ "./screens/command/new/NewCommand"),
            NewCommand => this.setState({
                content: <NewCommand/>,
            }));
    }

    commandDetailPage() {
        this.fetchModule(import(/* webpackChunkName: "CommandDetail" */ "./screens/command/detail/CommandDisplay"),
            CommandDisplay => this.setState({
                content: <CommandDisplay/>,
            }));
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Title from helmet</title>
                </Helmet>
                <NavBar/>
                {
                    !this.state.content &&
                    <div className="notification is-danger">
                        Vérifiez votre connexion internet et rafraichissez la page
                    </div>
                }
                <ErrorBoundary>
                    <SectionWithContainer>
                        {this.state.content}
                    </SectionWithContainer>
                </ErrorBoundary>
                <Footer/>
            </>
        );
    }

}

render(<Navigator/>);
