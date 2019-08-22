import React from "react";
import PropTypes from "prop-types";
import {ContributionType} from "../../../api/types";
import UserName from "../../../components/UserName";
import ProductName from "../../../components/ProductName";

export default class ShotsContributionDisplay extends React.Component {

    render() {
        const commands = [];
        let contribs = this.props.contributions.slice();
        while (contribs.length > 0) {
            const contrib = contribs[0];
            const matching = contribs.filter(c => c.product === contrib.product && c.user === contrib.user);
            let price = matching.map(c => c.part).reduce((a, b) => a + b);
            price = Math.round(price * 100) / 100;

            commands.push({
                id: contrib.id,
                count: matching.length,
                price,
                product: contrib.product,
                user: contrib.user,
            });

            const toRemove = matching.map(c => c.id);
            contribs = contribs.filter(c => !toRemove.includes(c.id));
        }

        return (
            <table className="table is-striped">
                <thead>
                <tr>
                    <th>Quantité</th>
                    <th>Shot</th>
                    <th>Attribution</th>
                    <th>Prix</th>
                </tr>
                </thead>
                <tbody>
                {
                    commands.map((command) => (
                        <tr key={command.id}>
                            <td>{command.count}</td>
                            <td><ProductName productId={command.product} /></td>
                            <td>
                                {
                                    command.user ?
                                        <UserName userId={command.user}/> :
                                        <>Non assigné</>
                                }
                            </td>
                            <td>{command.price}€</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        );
    }

}

ShotsContributionDisplay.propTypes = {
    contributions: PropTypes.arrayOf(ContributionType),
};