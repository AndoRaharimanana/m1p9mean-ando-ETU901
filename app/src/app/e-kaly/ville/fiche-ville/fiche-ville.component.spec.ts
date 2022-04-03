import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheVilleComponent } from './fiche-ville.component';

describe('FicheVilleComponent', () => {
  let component: FicheVilleComponent;
  let fixture: ComponentFixture<FicheVilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheVilleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
