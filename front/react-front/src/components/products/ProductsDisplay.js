import React from "react";
import Icon from "../Icon";
import {ProductItem, ProductsCategory, ProductsList} from "./index";
import PropTypes from "prop-types";
import {fetchAllProducts} from "../../api";

const TYPES_TO_CAT = {
    "OTHER": "Autre",
    "SHOT": "Shots",
    "FOOD": "Nourriture",
    "COCKTAIL": "Cocktails",
    "BEER": "Bière",
    "SOFT": "Soft"
};

export default class ProductsDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allProducts: [],
            filtered: [],
            selected: -1,
        };
        this.searchBarChange = this.searchBarChange.bind(this);
        this.onProductSelection = this.onProductSelection.bind(this);
    }

    searchBarChange(e) {
        const value = e.target.value.toLowerCase();
        this.setState((state, props) => ({
            filtered: state.allProducts.filter(props.preFilter).filter(p => {
                if (p.name.toLowerCase().indexOf(value) !== -1) {
                    return true;
                }
                const cat = TYPES_TO_CAT[p.product_type];
                if(cat && cat.toLowerCase().indexOf(value) !== -1) {
                    return true;
                }
                const ingredients = p.ingredients.reduce((previous, next) => previous + " " + next, "");
                return ingredients.toLowerCase().indexOf(value) !== -1;
            }),
        }));
    }

    onProductSelection(id) {
        this.setState((state, props) => {
            const newSelected = state.selected === id ? -1 : id;
            props.onProductSelection(newSelected);
            return {
                selected: newSelected,
            };
        });
    }

    componentDidMount() {
        fetchAllProducts().then(result => {
            if (result.ok) {
                this.setState({
                    allProducts: result.products,
                    filtered: result.products.filter(this.props.preFilter),
                });
            }
        }).catch(console.log);
    }

    render() {

        const cats = {
            "SHOT": [],
            "COCKTAIL": [],
            "FOOD": [],
            "BEER": [],
            "SOFT": [],
            "OTHER": [],
        };

        this.state.filtered.forEach((product) => {
            if (cats[product.product_type]) {
                cats[product.product_type].push(product)
            }
        });

        return (
            <>
                {
                    this.props.showSearchBar &&
                    <div className="columns">
                        <div className="column is-two-fifths">
                            <p className="control has-icons-left">
                                <input className="input" type="text"
                                       placeholder="Rechercher"
                                       onChange={this.searchBarChange}
                                />
                                <Icon iconName="search" iconClasses="is-small is-left"/>
                            </p>
                        </div>
                    </div>
                }
                <ProductsList>
                    {Object.keys(cats).filter((cat) => cats[cat].length > 0).map((cat) => (
                        <ProductsCategory key={cat}
                                          name={TYPES_TO_CAT[cat]}
                        >
                            {
                                cats[cat].map((product) => (
                                    <ProductItem key={product.id}
                                                 product={product}
                                                 onCommand={this.props.onCommand}
                                                 onSelect={this.onProductSelection}
                                                 selected={this.state.selected === product.id}
                                                 showCommandButton={this.props.showCommandButton}
                                    />
                                ))
                            }
                        </ProductsCategory>
                    ))}

                    {
                        Object.keys(cats).filter((cat) => cats[cat].length > 0).length === 0 &&
                        <h2 className="subtitle has-text-centered is-size-6">Pas de produits</h2>
                    }
                </ProductsList>
            </>
        );
    }

}

ProductsDisplay.propTypes = {
    showCommandButton: PropTypes.bool,
    onCommand: PropTypes.func,
    showSearchBar: PropTypes.bool,
    preFilter: PropTypes.func,
    onProductSelection: PropTypes.func,
};

ProductsDisplay.defaultProps = {
    showCommandButton: false,
    onCommand: () => {
    },
    showSearchBar: true,
    preFilter: () => true,
    onProductSelection: () => {
    },
};