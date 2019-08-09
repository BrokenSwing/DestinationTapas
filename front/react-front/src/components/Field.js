import React from "react";
import Icon from "./Icon";

export const FormField = ({
    field, form, ...props
}) => {
    const hasError = form.touched[field.name] && form.errors[field.name];
    const valid = form.touched[field.name] && !hasError;
    return (
        <div className="field">
            <label className="label">{props.placeholder}</label>
            <div className="control has-icons-right">
                <input className={`input ${hasError ? 'is-danger' : valid ? 'is-success' : ''}`} {...field} {...props} disabled={form.isSubmitting} />
                {
                    hasError ?
                        <Icon iconName="exclamation-triangle" iconClasses="is-small is-right" /> : ''
                }
                {
                    valid ?
                        <Icon iconName="check" iconClasses="is-small is-right" /> : ''
                }
            </div>
            {
                hasError ?
                    <p className="help is-danger">{form.errors[field.name]}</p> : ''
            }
        </div>
    )
};

export const FormSubmit = ({formProps, ...props}) => {
    return (
        <div className="field">
            <div className="control is-expanded">
                <button className="button is-link is-fullwidth" type="submit" disabled={formProps.isSubmitting || !formProps.isValid}>
                    {props.children}
                </button>
            </div>
        </div>
    );
};