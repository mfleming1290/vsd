import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCategoryListComponent } from './ad-category-list.component';

describe('AdCategoryListComponent', () => {
  let component: AdCategoryListComponent;
  let fixture: ComponentFixture<AdCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
