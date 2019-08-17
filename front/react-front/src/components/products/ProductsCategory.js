import React from "react";

export default class ProductsCategory extends React.Component {

    render() {
        return (
          <>
              <p className="menu-label">{this.props.name}</p>
              <ul className="menu-list">
                  {this.props.children}
              </ul>
          </>
        );
    }

}