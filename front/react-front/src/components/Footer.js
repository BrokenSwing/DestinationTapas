import React from "react";

export default class Footer extends React.Component {

    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Destination Tapas</strong> par <strong>Florent HUGOUVIEUX</strong>.
                        Le code source est sous la licence <a href={"https://www.apache.org/licenses/LICENSE-2.0.html"}>Apache 2</a>.
                    </p>
                </div>
            </footer>
        );
    }

}