import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import SelectorData from "./SelectorData";

export default class Selectable extends React.Component {

    constructor(props) {
        super(props);
        this.onUserClick = this.onUserClick.bind(this);
    }

    onUserClick() {
        if(this.props.selected && this.props.onDeselect) {
            this.props.onDeselect();
        } else if(this.props.onSelect) {
            this.props.onSelect();
        }
    }

    render() {
        return (
            <tr className={this.props.selected ? "is-selected": ""} onClick={this.onUserClick}>
                {this.props.children}
                <SelectorData>
                    {
                        this.props.locked ? <Icon iconName="lock"/> :
                            this.props.selected ? <Icon iconName="check-square"/> :
                                <span className="icon"/>
                    }
                </SelectorData>
            </tr>
        );
    }

}

Selectable.propTypes = {
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func,
    locked: PropTypes.bool,
};

Selectable.defaultProps = {
    locked: false,
};