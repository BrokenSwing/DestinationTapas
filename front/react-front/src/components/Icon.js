import React from "react";

export default class Icon extends React.Component {

    render() {
        return (
            <span className={`icon ${this.props.iconClasses !== undefined ? this.props.iconClasses : ''}`}>
                <i className={`fas fa-${this.props.iconName}`} />
            </span>
        );
    }

}