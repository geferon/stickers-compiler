import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationBaseComponent } from './generation-base.component';

describe('GenerationBaseComponent', () => {
  let component: GenerationBaseComponent;
  let fixture: ComponentFixture<GenerationBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerationBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
