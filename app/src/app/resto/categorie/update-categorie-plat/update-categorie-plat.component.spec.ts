import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoriePlatComponent } from './update-categorie-plat.component';

describe('UpdateCategoriePlatComponent', () => {
  let component: UpdateCategoriePlatComponent;
  let fixture: ComponentFixture<UpdateCategoriePlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCategoriePlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCategoriePlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
