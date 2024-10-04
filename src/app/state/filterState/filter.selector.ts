import { createSelector } from '@ngrx/store';
import { appState } from '../../appState'; // Adjust the import path accordingly
import { filterState } from './filter.reducer';

// Selector to get the filter state
export const selectFilterState = (state: appState) => state.filterState;
// Ensure this points to the correct filter state

// Selector to get the searchText from filter state
export const selectSearchText = createSelector(
    selectFilterState,
    (filterState: filterState) => filterState.searchText
);

// Selector to get the searchBtn from filter state
export const selectSearchBtn = createSelector(
    selectFilterState,
    (filterState: filterState) => filterState.searchBtn
);


export const getFilterState = createSelector(
    selectFilterState,
    (filter: filterState) => filter
);

