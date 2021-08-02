import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementDetailsComponent } from './student-details.component';

describe('RequirementDetailsComponent', () => {
  let component: RequirementDetailsComponent;
  let fixture: ComponentFixture<RequirementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
