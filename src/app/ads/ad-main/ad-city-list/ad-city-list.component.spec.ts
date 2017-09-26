import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCityListComponent } from './ad-city-list.component';

describe('AdCityListComponent', () => {
  let component: AdCityListComponent;
  let fixture: ComponentFixture<AdCityListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCityListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
