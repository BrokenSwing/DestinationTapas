import React from "react";
import "aviator";
import Field from "../../components/Field";
import "aviator";

export default class LogIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            submitting: false,
            errors: {},
        };
        this.onValueChange = this.onValueChange.bind(this);
    }

    onValueChange(field, e) {
        this.setState({
            [field]: e.target.value,
        });
    }

    render() {
        return (
            <>
                <h1 className="title">Connexion</h1>
                <Field name="username"
                       placeholder="Nom d'utilisateur"
                       value={this.state.username}
                       type="text"
                       onChange={(e) => this.onValueChange("username", e)}
                       error={this.state.errors["username"]}
                />
                <Field name="password"
                       placeholder="Mot de passe"
                       value={this.state.password}
                       type="password"
                       onChange={(e) => this.onValueChange("password", e)}
                       error={this.state.errors["password"]}
                />
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-primary" disabled={this.state.submitting}>Se connecter</button>
                    </div>
                    <div className="control">
                        <button className="button is-text"
                                onClick={() => Aviator.navigate("/register")}
                        >
                            Vous n'êtes pas inscrits
                        </button>
                    </div>
                </div>
            </>
        );
    }

}

