import { Component, inject, OnInit } from '@angular/core';
import { getProductCategories, IProduct, ProductServiceService } from '../../service/product-service.service';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { ProductComponent } from "../product/product.component";
import { Store } from '@ngrx/store';
import { addToCart } from '../../state/cartState/cart.action';
import { selectCartProducts } from '../../state/cartState/cart.selector';
import { appState } from '../../appState';
import { Observable, combineLatest, of } from 'rxjs';
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
  filteredProducts!: Observable<IProduct[]>;

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
    this.products.subscribe(productsArray => {
      // Now that you have the products array, pass it to filterProducts
      this.filteredProducts = this.filterProducts(this.searchObj, productsArray);
    });
  }

  addToCart(product: IProduct) {
    this.store.dispatch(addToCart({ product }));
  }


  ngOnInit(): void {
    // Select the filter state from the store
    this.appState.select(getFilterState).subscribe((filterState: filterState) => {
      this.searchObj = filterState;
      // Assign the filter state to searchObj
      this.search();
    });

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

    // Subscribe to products and filter them
    this.products.subscribe(productsArray => {
      // Now that you have the products array, pass it to filterProducts
      this.filteredProducts = this.filterProducts(this.searchObj, productsArray);
    });
  }

  filterProducts(sO: filterState, products: IProduct[]): Observable<IProduct[]> {
    // If both searchText and searchBtn are empty or default values, return all products
    let filtered: IProduct[] = []
    for (let i = 0; i < products.length; i++) {
      const pro = products[i];
      if (((pro.category == sO.searchBtn) || sO.searchBtn == '0') && (pro.name.includes(sO.searchText) || this.searchObj.searchText == '')) {
        filtered.push(products[i])
      }

    }

    return of(filtered); // Wrap filtered products in an observable
  }

}
