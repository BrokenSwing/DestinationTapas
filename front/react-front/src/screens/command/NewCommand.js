import React from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { ProductsList, ProductItem, ProductsCategory } from "../../components/products"

export default class NewCommand extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>

            </div>
        );
    }

}

class SelectProduct extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            filtered: []
        };
    }

}
