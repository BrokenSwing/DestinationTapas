import React from "react";
import PropTypes from "prop-types";

class ModalCard extends React.Component {

    render() {
        return (
            <div className="modal-card">
                {this.props.children}
            </div>
        );
    }

}

class ModalCardHead extends React.Component {

    render() {
        return (
            <header className="modal-card-head">
                {
                    this.props.title &&
                    <p className="modal-card-title has-text-centered" >{this.props.title}</p>
                }
                <button className="delete" aria-label="close" onClick={this.props.onClose} />
            </header>
        );
    }

}

ModalCardHead.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

class ModalCardBody extends React.Component {

    render() {
        return (
            <section className="modal-card-body">
                {this.props.children}
            </section>
        );
    }

}

class ModalCardFoot extends React.Component {

    render() {
        return (
            <footer className="modal-card-foot">
                {this.props.children}
            </footer>
        );
    }

}

export {
    ModalCard,
    ModalCardHead,
    ModalCardBody,
    ModalCardFoot,
};