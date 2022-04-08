import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoriePlatComponent } from './list-categorie-plat.component';

describe('ListCategoriePlatComponent', () => {
  let component: ListCategoriePlatComponent;
  let fixture: ComponentFixture<ListCategoriePlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCategoriePlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoriePlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
