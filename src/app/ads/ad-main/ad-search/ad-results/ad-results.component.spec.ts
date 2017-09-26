import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdResultsComponent } from './ad-results.component';

describe('AdResultsComponent', () => {
  let component: AdResultsComponent;
  let fixture: ComponentFixture<AdResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
