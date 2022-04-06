import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheCategoriePlatComponent } from './fiche-categorie-plat.component';

describe('FicheCategoriePlatComponent', () => {
  let component: FicheCategoriePlatComponent;
  let fixture: ComponentFixture<FicheCategoriePlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheCategoriePlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheCategoriePlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
