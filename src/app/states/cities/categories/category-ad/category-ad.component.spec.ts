import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAdComponent } from './category-ad.component';

describe('CategoryAdComponent', () => {
  let component: CategoryAdComponent;
  let fixture: ComponentFixture<CategoryAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
