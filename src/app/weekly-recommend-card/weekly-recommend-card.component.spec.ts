import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyRecommendCardComponent } from './weekly-recommend-card.component';

describe('WeeklyRecommendCardComponent', () => {
  let component: WeeklyRecommendCardComponent;
  let fixture: ComponentFixture<WeeklyRecommendCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyRecommendCardComponent]
    });
    fixture = TestBed.createComponent(WeeklyRecommendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
