import { createReducer, on } from "@ngrx/store";
import { IProduct } from "../../service/product-service.service";
import { addToCart, decrementToCart, removeFromCart } from "./cart.action";

export interface cartState {
    products: IProduct[];
}

export const initialCartState: cartState = {
    products: []
}

export const cartReducer = createReducer(
    initialCartState,
    on(addToCart, (state, { product }) => { // Check if the product is already in the cart
        const existingProductIndex = state.products.findIndex(p => p.id === product.id);

        if (existingProductIndex !== -1) {
            // Product already exists, update its quantity
            const updatedProducts = state.products.map((p, index) => {
                if (index === existingProductIndex) {
                    return {
                        ...p,
                        quantity: p.quantity + 1 // Increment quantity
                    };
                }
                return p; // Return the product as is if it's not the one being updated
            });

            return {
                ...state,
                products: updatedProducts
            };
        }

        // If the product is not in the cart, add it with quantity 1
        const newProduct = { ...product, quantity: 1 }; // Initialize quantity to 1
        return {
            ...state,
            products: [...state.products, newProduct]
        };
    }),

    on(removeFromCart, (state, { product }) => {
        // Filter out the product to remove it from the cart
        const updatedProducts = state.products.filter(p => p.id !== product.id);

        return {
            ...state,
            products: updatedProducts
        };
    })

)
