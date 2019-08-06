import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Linha2Component } from './linha2.component';

describe('Linha2Component', () => {
  let component: Linha2Component;
  let fixture: ComponentFixture<Linha2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Linha2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Linha2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
