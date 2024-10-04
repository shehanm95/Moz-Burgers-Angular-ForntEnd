import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetCartCustomerComponent } from './set-cart-customer.component';

describe('SetCartCustomerComponent', () => {
  let component: SetCartCustomerComponent;
  let fixture: ComponentFixture<SetCartCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetCartCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetCartCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
