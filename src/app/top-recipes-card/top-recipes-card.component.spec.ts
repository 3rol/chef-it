import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRecipesCardComponent } from './top-recipes-card.component';

describe('TopRecipesCardComponent', () => {
  let component: TopRecipesCardComponent;
  let fixture: ComponentFixture<TopRecipesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopRecipesCardComponent]
    });
    fixture = TestBed.createComponent(TopRecipesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
