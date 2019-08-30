import React from "react";

export default class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return {error: "Internet problem"};
    }

    componentDidCatch(error, errorInfo) {
        console.log(`error: ${error}, errorInfo: ${errorInfo}`);
    }

    render() {
        return (
            <>
                {this.state.error && <div className="notification is-danger">{this.state.error}</div>}
                {this.props.children}
            </>
        );
    }

}