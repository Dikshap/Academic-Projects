import { Component, OnInit } from '@angular/core';
import { RequirementsService } from 'src/app/services/requirements.service';
@Component({
  selector: 'app-requirements-list',
  template: `
    <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by first_name"
          [(ngModel)]="first_name"
        />

        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            (click)="searchFirstName()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Registered Student List</h4>

      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let requirement of requirements; let i = index"
          [class.active]="i == currentIndex"
          (click)="setActiveRequirement(requirement, i)"
        >


          <b>{{ requirement.first_name }}</b>
          <p></p>
          <b>{{ requirement.last_name }}</b>
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" (click)="removeAllRequirements()">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div *ngIf="currentRequirement">
      <h4>Student</h4>
      <div>
        <label><strong>First Name:</strong></label> {{ currentRequirement.first_name }}
      </div>
      <div>
        <label><strong>Last Name:</strong></label>{{ currentRequirement.last_name }}
      </div>

      <div>
        <label><strong>Course:</strong></label>{{ currentRequirement.course }}
      </div>

      <div>
        <label><strong>Phone Number:</strong></label>{{ currentRequirement.phone_no }}
      </div>

      <div>
        <label><strong>Country Name:</strong></label>{{ currentRequirement.gender }}
      </div>
      <div>
        <label><strong>Gender:</strong></label>{{ currentRequirement.gender }}
      </div>
        <button class="badge badge-warning" routerLink="/requirements/{{ currentRequirement._id }}">
          Edit
        </button>
      </div>

      <div *ngIf="!currentRequirement">
        <br />
        <p>Please click on a Student to find out the details...</p>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class RequirementsListComponent implements OnInit {

  requirements: any;
  currentRequirement = null;
  currentIndex = -1;
  first_name = '';

  constructor(private requirementService: RequirementsService) { }

  ngOnInit(): void {
    this.retrieveRequirements();
  }

  retrieveRequirements(): void {
    this.requirementService.getAll()
      .subscribe(
        data => {
          this.requirements = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveRequirements();
    this.currentRequirement = null;
    this.currentIndex = -1;
  }

  setActiveRequirement(requirement, index): void {
    this.currentRequirement = requirement;
    this.currentIndex = index;
  }

  removeAllRequirements(): void {
    this.requirementService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveRequirements();
        },
        error => {
          console.log(error);
        });
  }

  searchFirstName(): void {
    this.requirementService.findByFirstName(this.first_name)
      .subscribe(
        data => {
          this.requirements = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
