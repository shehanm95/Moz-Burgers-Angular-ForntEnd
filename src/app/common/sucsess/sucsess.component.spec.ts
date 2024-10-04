import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucsessComponent } from './sucsess.component';

describe('SucsessComponent', () => {
  let component: SucsessComponent;
  let fixture: ComponentFixture<SucsessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucsessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucsessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
