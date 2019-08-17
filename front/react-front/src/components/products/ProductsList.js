import React from "react";

export default class ProductsList extends React.Component {

    render() {
        return (
            <div className="columns">
                <div className="column is-two-fifths">
                    <aside className="menu">
                        {this.props.children}
                    </aside>
                </div>
            </div>
        );
    }

}