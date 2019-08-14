import React from "react";
import PropTypes from "prop-types";

export default class Modal extends React.Component {

    render() {
        return (
            <div className={`modal ${this.props.active ? "is-active" : ""}`}>
                <div className="modal-background" onClick={this.props.onClose} />
                {this.props.children}
            </div>
        )
    }

}

Modal.propTypes = {
    active: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
    active: false,
};