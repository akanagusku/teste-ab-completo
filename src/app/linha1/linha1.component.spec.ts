import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Linha1Component } from './linha1.component';

describe('Linha1Component', () => {
  let component: Linha1Component;
  let fixture: ComponentFixture<Linha1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Linha1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Linha1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
