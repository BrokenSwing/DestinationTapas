import React from "react";
import PropTypes from "prop-types";
import ProductsList from "./ProductsList";
import ProductsCategory from "./ProductsCategory";

export default class ProductItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    componentWillUnmount() {
        if(this.props.list.state.selectedProduct === this) {
            this.props.list.onProductSelect(this);
        }
    }

    render() {
        return (
            <li>
                <a className={this.state.selected ? 'is-active' : ''} onClick={() => this.props.list.onProductSelect(this)}>
                    <div className="columns is-mobile">
                        <div className="column">
                            {this.props.name} {this.props.showCommandButton ? ` ~ ${this.props.price}€` : ''}
                            {
                                this.state.selected && this.props.ingredients.length > 0 ?
                                    <div className="columns is-mobile">
                                        <div className="column is-size-7">
                                            {this.props.ingredients.reduce((first, second) => `${first.name}, ${second.name}`)}
                                        </div>
                                    </div>
                                : ''
                            }
                        </div>
                        {
                            this.props.showCommandButton && this.state.selected ?
                            <div className="column">
                                <button className="button is-primary"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            console.log(`Start command for ${this.props.name}`)}
                                        }>
                                    Commander
                                </button>
                            </div> : <div className="column has-text-right">{this.props.price}€</div>
                        }
                    </div>
                </a>
            </li>
        );
    }

}

ProductsCategory.propTypes = {
    showCommandButton: PropTypes.bool,
    list: PropTypes.instanceOf(ProductsList)
};

ProductItem.defaultProps = {
    ingredients: [],
    price: 0,
    showCommandButton: false,
};