import React from "react";
import {ProductsDisplay} from "../../../components/products";
import PropTypes from "prop-types";

export default class ChooseProduct extends React.Component {

    render() {
        return (
            <>
                <h2 className="subtitle is-size-5">1. Sélectionnez ce que vous voulez commander</h2>
                <ProductsDisplay showCommandButton={true} onCommand={this.props.onCommand}/>
            </>
        )
    }

}

ChooseProduct.propTypes = {
    onCommand: PropTypes.func.isRequired,
};