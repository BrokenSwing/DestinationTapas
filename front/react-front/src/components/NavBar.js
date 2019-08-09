import React from "react";
import Icon from "./Icon";
import "aviator";
import { withCookies } from "react-cookie";

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.burger = React.createRef();
        this.menu = React.createRef();
        this.onBurgerClick = this.onBurgerClick.bind(this);
        this.triggerDisconnection = this.triggerDisconnection.bind(this);
    }

    onBurgerClick() {
        this.burger.current.classList.toggle("is-active");
        this.menu.current.classList.toggle("is-active");
    }

    triggerDisconnection() {
        this.props.cookies.remove("auth_token");
        Aviator.navigate("/");
    }

    render() {
        return (
            <nav className="navbar has-shadow is-spaced">
                <div className="container">
                    <div className="navbar-brand">
                        <h1 className="navbar-item">
                            Destination Tapas
                        </h1>
                        <div className="navbar-burger" ref={this.burger} aria-label="menu" aria-expanded="false" onClick={this.onBurgerClick}>
                            <span aria-expanded="true" />
                            <span aria-expanded="true" />
                            <span aria-expanded="true" />
                        </div>
                    </div>
                    <div className="navbar-menu" ref={this.menu}>
                        <div className="navbar-start">
                            <a className="navbar-item">
                                <Icon iconName="user" />
                                <span>Profil</span>
                            </a>
                            <a className="navbar-item">
                                <Icon iconName="glass-cheers" />
                                <span>Soirée</span>
                            </a>
                            <a className="navbar-item">
                               <Icon iconName="address-book" />
                                <span>Amis</span>
                            </a>
                            <a className="navbar-item navigate" href={Aviator.hrefFor("/products")}>
                                <Icon iconName="pizza-slice" />
                                <span>Carte</span>
                            </a>
                        </div>
                        <div className="navbar-end">
                            <a className="navbar-item" onClick={this.triggerDisconnection}>
                                 <Icon iconName="sign-out-alt" />
                                <span>Se déconnecter</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

}

export default withCookies(NavBar);