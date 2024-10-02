import { createAction, props } from "@ngrx/store";
import { IProduct } from "../../service/product-service.service";

export const addToCart = createAction("[cart] addToCart", props<{ product: IProduct }>())
export const decrementToCart = createAction("[cart] decrementToCart", props<{ product: IProduct }>())
export const removeFromCart = createAction("[cart] removeToCart", props<{ product: IProduct }>())