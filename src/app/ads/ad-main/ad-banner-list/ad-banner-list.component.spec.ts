import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBannerListComponent } from './ad-banner-list.component';

describe('AdBannerListComponent', () => {
  let component: AdBannerListComponent;
  let fixture: ComponentFixture<AdBannerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdBannerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdBannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
