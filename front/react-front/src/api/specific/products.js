import {get} from "../methods";
import * as endpoints from "../endpoints";

const productsCache = {};

export const fetchAllProducts = async () => {
    const result = await get(endpoints.ALL_PRODUCTS);
    if(result.ok) {
        const products = await result.json();

        // Caching products
        products.forEach(product => productsCache[product.id] = product);

        return {
            ok: true,
            products,
        };
    }
    return {
        ok: false,
    };
};

export const fetchProduct = async (id) => {
    if(productsCache[id]) {
        return {
            ok: true,
            product: productsCache[id],
        };
    }

    const result = await get(endpoints.SINGLE_PRODUCT(id));
    if(result.ok) {
        const product = await result.json();
        // Caching product
        productsCache[product.id] = product;
        return {
            ok: true,
            product,
        };
    }
    return {
        ok: false,
    };
};