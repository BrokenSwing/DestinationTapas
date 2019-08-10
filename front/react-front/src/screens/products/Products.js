import React from 'react';
import "aviator";
import NavBar from "../../components/NavBar"
import Footer from "../../components/Footer";
import { ProductItem, ProductsCategory, ProductsList } from "../../components/products";
import ProgressBar from "../../components/ProgressBar";
import Icon from "../../components/Icon";
import { fetchAllProducts } from "../../api/api";

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            filteredProducts: null,
        };
        this.filterProducts = this.filterProducts.bind(this);
    }

    filterProducts(search) {
        search = search.target.value.toLowerCase();
        let filtered = [];
        this.state.products.forEach(product => {
            if(product.name.toLowerCase().indexOf(search) !== -1) {
                filtered.push(product);
            } else if(product.ingredients.length > 0) {
                const concat = product.ingredients.reduce((first, second) => first.name + " " + second.name).toLowerCase();
                if(concat.indexOf(search) !== -1) {
                    filtered.push(product);
                }
            }
        });
        this.setState({
            filteredProducts: filtered,
        })
    }

    componentDidMount() {
        fetchAllProducts().then((result) => {
            if(result.ok) {
                this.setState({
                    products: result.products,
                    filteredProducts: result.products,
                });
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
                this.state.filteredProducts ? ShowProducts(this.state.filteredProducts, this.filterProducts) :
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

function ShowProducts(products, searchCb) {

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
                <div className="columns">
                    <div className="column is-two-fifths">
                        <p className="control has-icons-left">
                            <input className="input" type="text" placeholder="Rechercher" onChange={searchCb} />
                            <Icon iconName="search" iconClasses="is-small is-left" />
                        </p>
                    </div>
                </div>
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
