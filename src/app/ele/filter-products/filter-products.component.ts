import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setFilterAction } from '../../state/filterState/filter.action'; // Adjust the import path accordingly
import { appState } from '../../appState';
import { getFilterState } from '../../state/filterState/filter.selector';
import { filterState } from '../../state/filterState/filter.reducer';

@Component({
  selector: 'app-filter-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-products.component.html',
  styleUrls: ['./filter-products.component.css'] // Fixed styleUrl to styleUrls
})
export class FilterProductsComponent implements OnInit {
  @Output() getSearchObject = new EventEmitter();

  // Injecting the Store

  constructor(private store: Store<appState>) { }
  ngOnInit(): void {
    this.store.select(getFilterState).subscribe(f => {
      this.selectedButton = f.searchBtn;
      this.searchText = f.searchText;
    });
  }
  searchText: string = "";
  selectedButton: string = "1"; // Default selected button

  setSearchObject() {
    // Emit the search object (if needed)

    // Set the filter state
    this.store.dispatch(setFilterAction({ searchText: this.searchText, searchBtn: this.selectedButton }));
    this.getSearchObject.emit(this.createSearchObj());
  }

  createSearchObj() {
    return {
      searchText: this.searchText,
      searchBtn: this.selectedButton
    };
  }

  setSelectedButton(val: string) {
    this.selectedButton = val;
    this.setSearchObject(); // Call setSearchObject to update the filter state
  }
}
