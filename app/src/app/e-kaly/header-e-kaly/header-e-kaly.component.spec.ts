import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEKalyComponent } from './header-e-kaly.component';

describe('HeaderEKalyComponent', () => {
  let component: HeaderEKalyComponent;
  let fixture: ComponentFixture<HeaderEKalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderEKalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEKalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
