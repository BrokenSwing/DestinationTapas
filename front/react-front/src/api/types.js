import PropTypes from "prop-types";

export const ProductType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    old: PropTypes.bool.isRequired,
    product_type: PropTypes.oneOf(["SHOT", "FOOD", "COCKTAIL", "OTHER", "BEER", "SOFT"]).isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
});

export const ContributionType = PropTypes.shape({
    user: PropTypes.number,
    part: PropTypes.number.isRequired,
    product: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
});