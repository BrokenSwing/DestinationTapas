import React from "react";

export default class SelectorData extends React.Component {

    render() {
        const {className, ...props} = this.props;
        return (
            <td className={`has-text-centered ${className ? className : ''}`} {...props}>{this.props.children}</td>
        );
    }

}
