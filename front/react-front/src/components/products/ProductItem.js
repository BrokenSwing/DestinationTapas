import React from "react";

export default class ProductItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
        };
    }

    render() {
        return (
            <li>
                <a className={this.state.selected ? 'is-active' : ''} onClick={() => this.props.list.onProductSelect(this)}>
                    <div className="columns is-mobile">
                        <div className="column">
                            {this.props.name} ~ {this.props.price}€
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
                            </div> : ''
                        }
                    </div>
                </a>
            </li>
        );
    }

}

ProductItem.defaultProps = {
    ingredients: [],
    price: 0,
    showCommandButton: false,
};