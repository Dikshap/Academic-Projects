import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipinfoComponent } from './scholarshipinfo.component';

describe('ScholarshipinfoComponent', () => {
  let component: ScholarshipinfoComponent;
  let fixture: ComponentFixture<ScholarshipinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarshipinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScholarshipinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
