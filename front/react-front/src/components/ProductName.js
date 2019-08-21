import React from "react";
import {fetchProduct} from "../api/specific/products";
import PropTypes from "prop-types";

export default class ProductName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: "",
        };
    }

    componentDidMount() {
        fetchProduct(this.props.productId).then(result => {
            if(result.ok) {
                this.setState({
                    productName: result.product.name,
                });
            }
        }).catch(console.log);
    }

    render() {
        return (
            <>{this.state.productName}</>
        );
    }

}

ProductName.propTypes = {
    productId: PropTypes.number.isRequired,
};