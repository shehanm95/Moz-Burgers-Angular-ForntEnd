import { createAction, props } from "@ngrx/store";
import { filterState } from "./filter.reducer";

export const setFilterAction = createAction('[filter setValue]', props<filterState>());