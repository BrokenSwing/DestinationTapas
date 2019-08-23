import React from "react";
import "aviator";

export default class Link extends React.Component {

    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }

    navigate(e) {
        e.preventDefault();
        if(!this.props.disabled) {
            Aviator.navigate(this.props.href);
        }
    }

    render() {
        return (
            <a {...this.props} onClick={this.navigate} >
                {this.props.children}
            </a>
        );
    }

}