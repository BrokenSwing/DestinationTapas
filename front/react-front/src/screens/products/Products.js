import React from 'react';
import "aviator";
import ProductsDisplay from "../../components/products/ProductsDisplay";

class Products extends React.Component {

    render() {
        return (
            <>
                <h1 className="title">Liste des produits</h1>
                <ProductsDisplay/>
            </>
        )
    }

}

export default Products;
