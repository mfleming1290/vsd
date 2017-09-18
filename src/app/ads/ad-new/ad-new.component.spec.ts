import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNewComponent } from './ad-new.component';

describe('AdNewComponent', () => {
  let component: AdNewComponent;
  let fixture: ComponentFixture<AdNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
