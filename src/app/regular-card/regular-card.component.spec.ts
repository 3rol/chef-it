import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularCardComponent } from './regular-card.component';

describe('RegularCardComponent', () => {
  let component: RegularCardComponent;
  let fixture: ComponentFixture<RegularCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegularCardComponent]
    });
    fixture = TestBed.createComponent(RegularCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
