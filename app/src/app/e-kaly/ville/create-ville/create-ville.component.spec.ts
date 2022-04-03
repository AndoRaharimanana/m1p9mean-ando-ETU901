import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVilleComponent } from './create-ville.component';

describe('CreateVilleComponent', () => {
  let component: CreateVilleComponent;
  let fixture: ComponentFixture<CreateVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
