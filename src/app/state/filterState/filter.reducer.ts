import { createReducer, on } from "@ngrx/store";
import { setFilterAction } from "./filter.action";
// Make sure the import path is correct


export interface filterState { searchText: string, searchBtn: string }

export const initialState: filterState = {
    searchText: "",
    searchBtn: "1"
}

export const filterReducer = createReducer(
    initialState,
    on(setFilterAction, (state, { searchText, searchBtn }) => ({
        ...state,
        searchText: searchText, // Update searchText
        searchBtn: searchBtn    // Update searchBtn
    }))
);