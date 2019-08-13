import React from "react";
import { fetchUser } from "../api/api";
import PropTypes from "prop-types";

export default class UserName extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        fetchUser(this.props.userId).then(result => {
            if(result.ok) {
                this.setState({
                    user: result.user,
                });
            }
        }).catch(console.log)
    }

    render() {
        return (
            <>{this.state.user && this.state.user.username}</>
        )
    }

}

UserName.propTypes = {
    userId: PropTypes.number.isRequired,
};