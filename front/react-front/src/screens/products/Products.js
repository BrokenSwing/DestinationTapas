import React from 'react';
import "aviator";
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer";
import { ProductItem, ProductsCategory, ProductsList } from "../../components/products";
import ProgressBar from "../../components/ProgressBar";
import { fetchAllProducts } from "../../api/api";

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null
        }
    }

    componentWillMount() {
        fetchAllProducts().then((result) => {
            if(result.ok) {
                this.setState({
                    products: result.products,
                });
            } else {
                console.log(JSON.stringify(result));
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        return (
        <>
            <NavBar />
            {
                this.state.products ? ShowProducts(this.state.products) :
                    <ProgressBar/>
            }
            <Footer />
        </>
        )
    }

}

const TYPES_TO_CAT = {
    "OTHER": "Autre",
    "SHOT": "Shots",
    "FOOD": "Nourriture",
    "COCKTAIL": "Cocktails"
};

function ShowProducts(products) {

    const cats = {
        "SHOT": [],
        "COCKTAIL": [],
        "FOOD": [],
        "OTHER": [],
    };

    products.forEach((product) => {
       if(cats[product.product_type]) {
            cats[product.product_type].push(product)
       }
    });

    return (
    <>
        <section className="section">
            <div className="container">
                <h1 className="title">Liste des produits</h1>
                <ProductsList>
                    {Object.keys(cats).map((cat) => (
                        <ProductsCategory key={cat} name={TYPES_TO_CAT[cat]}>
                            {cats[cat].map((product) => (
                                <ProductItem key={product.id} price={product.price}
                                             name={product.name} ingredients={product.ingredients} />
                            ))}
                        </ProductsCategory>
                    ))}
                </ProductsList>
            </div>
        </section>
    </>
    );
}

export default Products;
