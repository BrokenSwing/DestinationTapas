import React from 'react';
import "aviator";
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer";
import ProductsDisplay from "../../components/products/ProductsDisplay";

class Products extends React.Component {

    render() {
        return (
        <>
            <NavBar />
            <section className="section">
                <div className="container">
                    <h1 className="title">Liste des produits</h1>
                    <ProductsDisplay />
                </div>
            </section>
            <Footer />
        </>
        )
    }

}

export default Products;
