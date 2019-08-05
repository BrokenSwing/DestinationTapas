import React from "react";

export default ({
    field, form, ...props
}) => {
    const hasError = form.touched[field.name] && form.errors[field.name];
    return (
        <div className="field">
            <div className="control has-icons-right">
                <input className={`input ${hasError ? 'is-danger' : ''}`} {...field} {...props} disabled={form.isSubmitting} />
                <span className="icon is-small is-right">
                {hasError ?
                    <i className="fas fa-check" /> :
                    <i className="fas fa-exclamation-triangle" />
                }
                </span>
            </div>
            {
                hasError ?
                    <p className="help is-danger">{form.errors[field.name]}</p> : ''
            }
        </div>
    )
};