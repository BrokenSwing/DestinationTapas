import React from "react";
import PropTypes from "prop-types";
import {ProductType} from "../../api/types";

export default class ProductItem extends React.Component {

    render() {
        return (
            <li>
                <a className={this.props.selected ? 'is-active' : ''}
                   onClick={() => this.props.onSelect(this.props.product.id)}
                >
                    <div className="columns is-gapless is-multiline">
                        <div className="column is-12">
                            {this.props.product.name}
                            <span className="has-text-right" style={{float: "right"}}>{this.props.product.price}€</span>
                        </div>
                        {
                            this.props.selected && this.props.product.ingredients.length > 0 &&
                            <div className="column is-size-7">
                                {
                                    this.props.product.ingredients.map(ing => ing.name)
                                        .reduce((previous, next) => `${previous}, ${next}`)
                                }
                            </div>
                        }
                    </div>
                    {
                        this.props.showCommandButton && this.props.selected &&
                        <button className="button is-link"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    event.preventDefault();
                                    this.props.onCommand(this.props.product.id);
                                }}
                        >
                            Commander
                        </button>
                    }
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
    product: ProductType.isRequired,
};

ProductItem.defaultProps = {
    selected: false,
    showCommandButton: false,
    onCommand: () => {
    },
    onSelect: () => {
    },
};