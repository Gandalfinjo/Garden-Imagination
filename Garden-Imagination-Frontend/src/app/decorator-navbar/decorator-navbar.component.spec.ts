import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorNavbarComponent } from './decorator-navbar.component';

describe('DecoratorNavbarComponent', () => {
  let component: DecoratorNavbarComponent;
  let fixture: ComponentFixture<DecoratorNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoratorNavbarComponent]
    });
    fixture = TestBed.createComponent(DecoratorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
