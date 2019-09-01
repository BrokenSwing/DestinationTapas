import React from "react";
import Field from "../../components/Field";
import "aviator";

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            errors: {},
            submitting: false,
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
                <h1 className="title">S'inscrire</h1>
                <Field name="username"
                       placeholder="Nom d'utilisateur"
                       type="text"
                       value={this.state.username}
                       error={this.state.errors["username"]}
                       onChange={(e) => this.onValueChange("username", e)}
                />
                <Field name="password"
                       placeholder="Mot de passe"
                       type="password"
                       value={this.state.username}
                       error={this.state.errors["password"]}
                       onChange={(e) => this.onValueChange("password", e)}
                />
                <Field name="passwordConfirm"
                       placeholder="Confirmation du mot de passe"
                       type="password"
                       value={this.state.username}
                       error={this.state.errors["passwordConfirm"]}
                       onChange={(e) => this.onValueChange("passwordConfirm", e)}
                />
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-primary" disabled={this.state.submitting}>S'inscrire</button>
                    </div>
                    <div className="control">
                        <button className="button is-text"
                                onClick={() => Aviator.navigate("/auth")}
                        >
                            Vous êtes déjà inscrits
                        </button>
                    </div>
                </div>
            </>
        )
    }

}