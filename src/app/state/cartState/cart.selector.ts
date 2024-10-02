import { createSelector } from "@ngrx/store";
import { appState } from "../../appState";
import { cartState } from "./cart.reducer";

export const selectCartState = (state: appState) => state.cartState;

export const selectCartProducts = createSelector(
    selectCartState,
    (state: cartState) => state.products
)