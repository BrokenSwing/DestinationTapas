import React from "react";

export default class ProductsList extends React.Component {

    constructor(props) {
        super(props);
        this.onProductSelect = this.onProductSelect.bind(this);
        this.state = {
            selectedProduct: null,
        };
    }

    onProductSelect(product) {
        if(this.state.selectedProduct !== null) {
            this.state.selectedProduct.setState({
                selected: false,
            });
        }

        if(this.state.selectedProduct === product) {
            this.setState({
                selectedProduct: null,
            });
        } else {
            this.setState({
                selectedProduct: product,
            });
            product.setState({
                selected: true,
            });
        }

    }

    render() {
        return (
            <div className="columns">
                <div className="column is-two-fifths">
                    <aside className="menu">
                        {React.Children.map(this.props.children,
                      child => React.cloneElement(child, {
                          showCommandButton: this.props.showCommandButton,
                          list: this,
                      }))}
                    </aside>
                </div>
            </div>
        );
    }

}

ProductsList.defaultProps = {
    showCommandButton: false,
};