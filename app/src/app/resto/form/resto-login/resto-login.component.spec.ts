import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoLoginComponent } from './resto-login.component';

describe('RestoLoginComponent', () => {
  let component: RestoLoginComponent;
  let fixture: ComponentFixture<RestoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
