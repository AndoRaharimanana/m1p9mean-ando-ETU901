import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRestoComponent } from './header-resto.component';

describe('HeaderRestoComponent', () => {
  let component: HeaderRestoComponent;
  let fixture: ComponentFixture<HeaderRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
