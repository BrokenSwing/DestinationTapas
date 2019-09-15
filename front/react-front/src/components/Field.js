import React from "react";
import Icon from "./Icon";

const Field = ({name, value, type, changed, onChange, error, ...props}) => (
    <div className="field">
        <label className="label">{props.placeholder || name}</label>
        <div className="control has-icon-right">
            <input className={`input ${error ? "is-danger" : changed ? "is-success" : ""}`}
                   type={type}
                   onChange={onChange}
                   value={value}
                   name={name}
                   {...props}
            />
            {
                error && <Icon iconName="exclamation-triangle" iconClasses="is-small is-right"/>
            }
            {
                changed && !error && <Icon iconName="check" iconClasses="is-small is-right"/>
            }
        </div>
    </div>
);

export default Field;