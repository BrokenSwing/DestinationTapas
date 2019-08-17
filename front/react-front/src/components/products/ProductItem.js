import React from "react";
import PropTypes from "prop-types";

export default class ProductItem extends React.Component {

    render() {
        return (
            <li>
                <a className={this.props.selected ? 'is-active' : ''}
                   onClick={() => this.props.onSelect(this.props.product.id)}
                >
                    <div className="columns is-mobile">
                        <div className={`column ${this.props.showCommandButton ? '' : 'is-10'}`}>
                            {this.props.product.name}
                            {this.props.showCommandButton ? ` ~ ${this.props.product.price}€` : ''}
                            {
                                this.props.selected && this.props.product.ingredients.length > 0 &&
                                <div className="columns is-mobile">
                                    <div className="column is-size-7">
                                        {
                                            this.props.product.ingredients.map(ing => ing.name)
                                                .reduce((previous, next) => `${previous}, ${next}`)
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        {
                            this.props.showCommandButton && this.props.selected &&
                            <div className="column">
                                <button className="button is-link"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            event.preventDefault();
                                            this.props.onCommand(this.props.product.id);
                                        }}
                                >
                                    Commander
                                </button>
                            </div>
                        }
                        {
                            !this.props.showCommandButton &&
                            <div className="column has-text-right">{this.props.product.price}€</div>
                        }
                    </div>
                </a>
            </li>
        );
    }

}

ProductItem.propTypes = {
    selected: PropTypes.bool,
    showCommandButton: PropTypes.bool,
    onCommand: PropTypes.func,
    onSelect: PropTypes.func,
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        old: PropTypes.bool.isRequired,
        product_type: PropTypes.oneOf(["SHOT", "FOOD", "COCKTAIL", "OTHER"]).isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
    }).isRequired,
};

ProductItem.defaultProps = {
    selected: false,
    showCommandButton: false,
    onCommand: () => {},
    onSelect: () => {},
};