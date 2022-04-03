import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheRestoComponent } from './fiche-resto.component';

describe('FicheRestoComponent', () => {
  let component: FicheRestoComponent;
  let fixture: ComponentFixture<FicheRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
