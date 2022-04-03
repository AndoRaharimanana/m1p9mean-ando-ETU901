import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestoComponent } from './create-resto.component';

describe('CreateRestoComponent', () => {
  let component: CreateRestoComponent;
  let fixture: ComponentFixture<CreateRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
