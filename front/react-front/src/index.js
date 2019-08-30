import React from 'react';
import "./style.sass";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import 'aviator'
import {render, isConnected} from "./routing";
import {Helmet} from "react-helmet";
import ErrorBoundary from "./components/ErrorBoundary";
import Products from "./screens/products/Products";
import SectionWithContainer from "./components/SectionWithContainer";

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
        });
        Aviator.dispatch();
        Aviator.refresh();
    }

    mainPage() {
        import(/* webpackChunkName: "App" */ "./App").then(({default: App}) => {
            this.setState({
                content: <App/>
            })
        }).catch(() => this.setState({
            content: null,
        }));
    }

    authPage(request) {
        if (isConnected()) {
            if (request.queryParams.redirect) {
                Aviator.navigate(request.queryParams.redirect)
            } else {
                Aviator.navigate("/");
            }
        } else {
            import(/* webpackChunkName: "Auth" */ "./screens/auth/Auth").then(({default: Auth}) => {
                this.setState({
                    content: <Auth/>
                });
            }).catch(() => this.setState({
                content: null,
            }));
        }
    }

    productsPage() {
        import(/* webpackChunkName: "Products" */ "./screens/products/Products").then(({default: Product}) => {
            this.setState({
                content: <Products/>,
            });
        }).catch(() => this.setState({
            content: null,
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
