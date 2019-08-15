import React from "react";
import PropTypes from "prop-types";
import ProductsList from "./ProductsList";

export default class ProductsCategory extends React.Component {

    render() {
        return (
          <>
              <p className="menu-label">{this.props.name}</p>
              <ul className="menu-list">
                  {React.Children.map(this.props.children,
                      child => child !== null && React.cloneElement(child, {
                          showCommandButton: this.props.showCommandButton,
                          list: this.props.list,
                      }))}
              </ul>
          </>
        );
    }

}

ProductsCategory.propTypes = {
    showCommandButton: PropTypes.bool,
    list: PropTypes.instanceOf(ProductsList)
};