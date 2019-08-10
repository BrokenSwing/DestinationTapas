import React from "react";
import Icon from "./Icon";

export default class UserSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        };
        this.onUserSelection = this.onUserSelection.bind(this);
    }

    onUserSelection(user) {
        let selected = this.state.selected;
        if(selected.includes(user.id)) {
            selected = selected.filter(id => id !== user.id);
        } else {
            selected.push(user.id);
        }
        this.setState({
            selected,
        });
    }

    render() {
        return (
            <table className="table is-striped is-fullwidth is-hoverable">
                <tbody>
                    {this.props.users
                        .sort((first, second) => first.name.localeCompare(second.name))
                        .map(user => (
                            <User key={user.id} user={user} selected={this.state.selected.includes(user.id)} selectionCb={this.onUserSelection} />
                        ))
                    }
                </tbody>
            </table>
        );
    }

}

const User = ({user, selected, selectionCb}) => (
    <tr className={selected ? "is-selected" : ""} onClick={() => selectionCb(user)}>
        <td className="has-text-centered">{user.name}</td>
        <td className="has-text-centered">
            {selected ?
                <Icon iconName="check-square" /> : <span className="icon" /> }
        </td>
    </tr>
);

UserSelector.defaultProps = {
    users: [],
};