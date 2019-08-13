import React from "react";
import PropTypes from "prop-types";

export default class Icon extends React.Component {

    render() {
        const name = this.props.iconName;
        return (
            <span className={`icon ${this.props.iconClasses !== undefined ? this.props.iconClasses : ''}`}>
                <i className={`fas fa-${name}`} />
            </span>
        );
    }

}

Icon.propTypes = {
    iconName: PropTypes.string.isRequired,
    iconClasses: PropTypes.string,
};