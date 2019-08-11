import React from "react";
import {withCookies} from "react-cookie";
import Footer from "../../components/Footer";
import { FormField, FormSubmit } from "../../components/Field";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { fetchToken } from "../../api/api"
import "aviator";
import NavBar from "../../components/NavBar";

const SignInSchema = Yup.object().shape({
    username: Yup.string()
        .max(20, "Maximum 20 characters")
        .required("Requis"),
    password: Yup.string()
        .required("Requis"),
});

class Auth extends React.Component {
    
    render() {
        return (
        <>
            <NavBar />
            <section className="section">
                <div className="container">
                    <Formik
                        onSubmit={(values, actions) => {
                            fetchToken(values.username, values.password)
                                .then(result => {
                                    actions.setSubmitting(false);
                                    if(result.ok) {
                                        this.props.cookies.set("auth_token", result.token);
                                        localStorage.setItem("userId", result.id);
                                        Aviator.refresh();
                                    } else {
                                        actions.setFieldError("password", "Mot de passe incorrect");
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                    actions.setSubmitting(false);
                                    actions.setFieldError("password", "Vérifiez votre connexion ou l'état du serveur");
                                });
                        }}

                        initialValues={{
                            username: '',
                            password: ''
                        }}

                        validationSchema={SignInSchema}

                        render={(props) => (
                            <Form className="form">
                                <Field name="username" type="text" placeholder="Nom d'utilisateur" component={FormField} />
                                <Field name="password" type="password" placeholder="Mot de passe" component={FormField} />
                                <FormSubmit formProps={props}>
                                    {props.isSubmitting ? "Connexion ..." : "Se connecter"}
                                </FormSubmit>
                            </Form>
                        )}
                    />
                </div>
            </section>
            <Footer />
        </>
    )}

}

export default withCookies(Auth);