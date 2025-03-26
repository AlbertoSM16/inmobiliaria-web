import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesListComponent } from './houses-list.component';

describe('HousesListComponent', () => {
  let component: HousesListComponent;
  let fixture: ComponentFixture<HousesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
