import React from "react";
import {ContributionType} from "../../../api/types";
import PropTypes from "prop-types";
import {Selector, Selectable, SelectorData} from "../../../components/selector";
import UserName from "../../../components/UserName";
import Icon from "../../../components/Icon";

export default class BasicContributionsDisplay extends React.Component {

    render() {
        return (
            <Selector>
                {this.props.contributions.map(contribution => (
                    <Selectable key={contribution.id} selected={true} locked={true}>
                        <SelectorData>
                            {
                                contribution.user ?
                                    <UserName userId={contribution.user}/> :
                                    <>Ceci ne devrait pas arriver, contactez un administrateur<Icon iconName="exclamation-triangle" /></>
                            }
                        </SelectorData>
                        <SelectorData>{contribution.part}€</SelectorData>
                    </Selectable>
                ))}
            </Selector>
        );
    }

}

BasicContributionsDisplay.propTypes = {
    contributions: PropTypes.arrayOf(ContributionType),
};