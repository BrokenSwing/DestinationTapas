import React from "react";
import {withCookies} from "react-cookie";
import Footer from "../../components/Footer";
import CField from "../../components/Field";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Cookies } from "react-cookie";

const SignInSchema = Yup.object().shape({
    username: Yup.string()
        .max(150, "Maximum 150 characters")
        .required("Requis"),
    password: Yup.string()
        .required("Requis"),
});

class Auth extends React.Component {
    
    render() {
        return (
        <>
            <Formik
                onSubmit={(values, actions) => {
                    const cookies = new Cookies();
                    fetch("/api/auth/", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-CSRFToken': cookies.get("csrftoken"),
                        },
                        body: JSON.stringify({
                            username: values.username,
                            password: values.password
                        }),
                    })
                        .then(result => {
                            console.log("Received status " + result.status);
                            if(result.ok) {
                                result.json().then(result => {
                                    console.log(`Got token ${result.token}`);
                                    cookies.set("auth_token", result.token);
                                    console.log(`Got auth cookie : ${cookies.get("auth_token")}`);
                                });
                            } else {
                                result.text().then(console.log);
                            }
                            actions.setSubmitting(false);
                        });
                }}

                initialValues={{
                    username: '',
                    password: ''
                }}

                validationSchema={SignInSchema}

                render={(props) => (
                    <Form className="form">
                        <Field name="username" type="text" placeholder="Nom d'utilisateur" component={CField} />
                        <Field name="password" type="password" placeholder="Mot de passe" component={CField} />
                        <div className="field">
                            <div className="control is-expanded">
                                <button className="button is-link is-fullwidth" type="submit" disabled={props.isSubmitting || !props.isValid}>Se connecter</button>
                            </div>
                        </div>
                    </Form>
                )}
            />
            <Footer />
        </>
    )}

}

export default withCookies(Auth);