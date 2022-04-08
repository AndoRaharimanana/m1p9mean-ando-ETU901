import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoriePlatComponent } from './create-categorie-plat.component';

describe('CreateCategoriePlatComponent', () => {
  let component: CreateCategoriePlatComponent;
  let fixture: ComponentFixture<CreateCategoriePlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCategoriePlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoriePlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
