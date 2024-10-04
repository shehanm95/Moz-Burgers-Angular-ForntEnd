import { Component, inject, OnInit } from '@angular/core';
import { getProductCategories, IProduct, ProductServiceService } from '../../service/product-service.service';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { ProductComponent } from "../product/product.component";
import { Store } from '@ngrx/store';
import { addToCart } from '../../state/cartState/cart.action';
import { selectCartProducts } from '../../state/cartState/cart.selector';
import { appState } from '../../appState';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterProductsComponent } from '../filter-products/filter-products.component';
import { filterState } from '../../state/filterState/filter.reducer';
import { getFilterState, selectFilterState } from '../../state/filterState/filter.selector';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, ProductComponent, AsyncPipe, CommonModule, FilterProductsComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  searCategoryText: string = "Burgers";
  searchObj: filterState = { searchBtn: "0", searchText: "" };
  products!: Observable<IProduct[]>; // Observable for products

  constructor(private store: Store<{ cart: IProduct[], filterState: filterState }>, private appState: Store<appState>, private productService: ProductServiceService) { }

  setSearchCategoryText() {
    if (this.searchObj.searchBtn === '0') {
      this.searCategoryText = 'All Products';
    } else {
      const index: number = +this.searchObj.searchBtn;
      this.searCategoryText = getProductCategories[index - 1].name;
    }
  }
  search() {
    this.appState.select(getFilterState).subscribe((filterState: filterState) => {
      this.searchObj = filterState;
      // Assign the filter state to searchObj
    });
    this.setSearchCategoryText();
  }

  addToCart(product: IProduct) {
    this.store.dispatch(addToCart({ product }));
  }

  ngOnInit(): void {

    // Select the filter state from the store
    this.appState.select(getFilterState).subscribe((filterState: filterState) => {
      this.searchObj = filterState;
      // Assign the filter state to searchObj
    });
    this.search();
    // Fetch products and cart state simultaneously
    const products$ = this.productService.getProducts();
    const cartProducts$ = this.appState.select(selectCartProducts);

    // Combine latest values from products and cart products
    this.products = combineLatest([products$, cartProducts$]).pipe(
      map(([products, cartProducts]) => {
        // Map each product to include cartQuantity
        return products.map(product => {
          const cartProduct = cartProducts.find(cp => cp.id === product.id);
          return {
            ...product,
            cartQuantity: cartProduct ? cartProduct.cartQuantity : 0 // Set cartQuantity if in cart or 0 if not
          };
        });
      })
    );
  }
}

// import { Component, inject, OnInit } from '@angular/core';
// import { getProductCategories, IProduct, ProductServiceService } from '../../service/product-service.service';
// import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
// import { ProductComponent } from "../product/product.component";
// import { Store } from '@ngrx/store';
// import { addToCart } from '../../state/cartState/cart.action';
// import { selectCartProducts } from '../../state/cartState/cart.selector';
// import { appState } from '../../appState';
// import { Observable } from 'rxjs';
// import { FilterProductsComponent, SearchObj } from '../filter-products/filter-products.component';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [NgFor, ProductComponent, AsyncPipe, CommonModule, FilterProductsComponent],
//   templateUrl: './products.component.html',
//   styleUrl: './products.component.css'
// })

// export class ProductsComponent implements OnInit {
//   searCategoryText: string = "Burgers";



//   setSearchCategoryText() {
//     if (this.searchObj.searchBtn == '0')
//       this.searCategoryText = 'All Products';
//     let index: number = +this.searchObj.searchBtn;
//     this.searCategoryText = getProductCategories[index - 1].name;
//   }


//   searchObj: SearchObj = { searchBtn: "0", searchText: "" };

//   search(searchObj: SearchObj) {
//     this.searchObj = searchObj;
//     this.setSearchCategoryText();
//     console.log(searchObj)
//   }

//   constructor(private store: Store<{ cart: IProduct[] }>, private appState: Store<appState>) {

//   }
//   addToCart(product: IProduct) {
//     this.store.dispatch(addToCart({ product }));
//     const products = this.appState.select(selectCartProducts);
//     console.log(this.appState.select(selectCartProducts))
//   }

//   productService = inject(ProductServiceService);
//   products!: Observable<IProduct[]>;

//   ngOnInit(): void {
//     this.products! = this.productService.getProducts();
//   }

// }
