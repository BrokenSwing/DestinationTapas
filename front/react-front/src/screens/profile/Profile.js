import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Icon from "../../components/Icon";
import UserName from "../../components/UserName";
import { fetchUserMisc } from "../../api/api";
import ProductName from "../../components/ProductName";

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            misc: null,
        };
    }

    componentDidMount() {
        fetchUserMisc(localStorage.getItem("userId")).then(result => {
            if(result.ok) {
                this.setState({
                   misc: result.misc,
                });
            }
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <NavBar/>
                <section className="section">
                    <div className="container">
                        <h1 className="title is-4 has-text-centered">Profil</h1>

                        <div className="box">
                            <h2 className="subtitle"><UserName userId={Number(localStorage.getItem("userId"))} /></h2>

                            <div className="columns">
                                <div className="column">
                                    <Icon iconName="heart" iconClasses="is-small"/>
                                    <span>
                                        {
                                            this.state.misc && this.state.misc.favorite ?
                                                <ProductName productId={this.state.misc.favorite}/> :
                                                "Pas de favori"
                                        }
                                    </span>
                                </div>

                                <div className="column">
                                    <Icon iconName="coins" iconClasses="is-small"/>
                                    <span>{this.state.misc ? this.state.misc.total_spent : 0 }€</span>
                                </div>

                                <div className="column">
                                    <Icon iconName="clock" iconClasses="is-small"/>
                                    <span>WIP</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </>
        );
    }

}