import React from "react";
import { fetchUser } from "../api/api";

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
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <>{this.state.user && this.state.user.username}</>
        )
    }

}