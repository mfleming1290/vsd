import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdBannerNewComponent } from './ad-banner-new.component';

describe('AdBannerNewComponent', () => {
  let component: AdBannerNewComponent;
  let fixture: ComponentFixture<AdBannerNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdBannerNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdBannerNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
