import { cartState } from "./state/cartState/cart.reducer";
import { filterState } from "./state/filterState/filter.reducer";


export interface appState {
    cartState: cartState
    filterState: filterState;
}

