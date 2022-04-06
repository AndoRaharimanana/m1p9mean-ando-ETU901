import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichePlatComponent } from './fiche-plat.component';

describe('FichePlatComponent', () => {
  let component: FichePlatComponent;
  let fixture: ComponentFixture<FichePlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichePlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichePlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
