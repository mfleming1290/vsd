import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdStateListComponent } from './ad-state-list.component';

describe('AdStateListComponent', () => {
  let component: AdStateListComponent;
  let fixture: ComponentFixture<AdStateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdStateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
