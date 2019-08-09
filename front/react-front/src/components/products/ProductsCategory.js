import React from "react";

export default class ProductsCategory extends React.Component {

    render() {
        return (
          <>
              <p className="menu-label">{this.props.name}</p>
              <ul className="menu-list">
                  {React.Children.map(this.props.children,
                      child => React.cloneElement(child, {
                          showCommandButton: this.props.showCommandButton,
                          list: this.props.list,
                      }))}
              </ul>
          </>
        );
    }

}