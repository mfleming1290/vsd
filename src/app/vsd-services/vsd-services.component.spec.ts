import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VsdServicesComponent } from './vsd-services.component';

describe('VsdServicesComponent', () => {
  let component: VsdServicesComponent;
  let fixture: ComponentFixture<VsdServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VsdServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VsdServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
