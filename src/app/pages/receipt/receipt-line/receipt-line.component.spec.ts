import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptLineComponent } from './receipt-line.component';

describe('ReceiptLineComponent', () => {
  let component: ReceiptLineComponent;
  let fixture: ComponentFixture<ReceiptLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptLineComponent]
    });
    fixture = TestBed.createComponent(ReceiptLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
