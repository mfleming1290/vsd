import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCategoriesComponent } from './city-categories.component';

describe('CityCategoriesComponent', () => {
  let component: CityCategoriesComponent;
  let fixture: ComponentFixture<CityCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
