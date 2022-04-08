import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRestoComponent } from './page-resto.component';

describe('PageRestoComponent', () => {
  let component: PageRestoComponent;
  let fixture: ComponentFixture<PageRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
