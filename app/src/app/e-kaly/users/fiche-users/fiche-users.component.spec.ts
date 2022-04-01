import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheUsersComponent } from './fiche-users.component';

describe('FicheUsersComponent', () => {
  let component: FicheUsersComponent;
  let fixture: ComponentFixture<FicheUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
