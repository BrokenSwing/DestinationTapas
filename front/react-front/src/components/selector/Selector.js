import React from "react";

export default class Selector extends React.Component {

    render() {
        return (
            <table className="table is-striped is-fullwidth is-hoverable">
                <tbody>{this.props.children}</tbody>
            </table>
        );
    }

}