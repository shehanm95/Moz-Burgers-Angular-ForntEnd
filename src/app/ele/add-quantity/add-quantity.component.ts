import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-quantity',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-quantity.component.html',
  styleUrl: './add-quantity.component.css'
})
export class AddQuantityComponent {
  @Output() onQuantityChanged = new EventEmitter();
  changeValue: string = "add";

  sendQuantity(form: NgForm) {
    if (form.valid) {
      let changeQForm: addQu = form.value;
      let qu = changeQForm.change == "add" ? changeQForm.changedQuantity : -changeQForm.changedQuantity;
      this.onQuantityChanged.emit(qu);
      form.reset();
    }
  }
}

export interface addQu {
  change: string,
  changedQuantity: number
}