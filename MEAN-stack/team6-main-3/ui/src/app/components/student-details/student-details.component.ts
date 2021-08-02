import { Component, OnInit } from '@angular/core';
import { RequirementsService } from 'src/app/services/requirements.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-requirement-details',
  template: `
  <div style="width: 400px; margin: auto;">
  <div *ngIf="currentRequirement" class="edit-form">
    <h4>Student Information</h4>
    <form>
      <div class="form-group">
        <label for="first_name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first_name"
          [(ngModel)]="currentRequirement.first_name"
          name="first_name"
        />
      </div>

      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="last_name"
          [(ngModel)]="currentRequirement.last_name"
          name="last_name"
        />
      </div>


      <div class="form-group">
      <label for="course">Course</label>
      <input
        type="text"
        class="form-control"
        id="course"
        [(ngModel)]="currentRequirement.course"
        name="course"
      />
    </div>


    <div class="form-group">
    <label for="phone_no">Phone Number</label>
    <input
      type="text"
      class="form-control"
      id="phone_no"
      [(ngModel)]="currentRequirement.phone_no"
      name="phone_no"
    />
  </div>




<div class="form-group">
<label for="country_name">Country</label>
<input
  type="text"
  class="form-control"
  id="country_name"
  [(ngModel)]="currentRequirement.country_name"
  name="country_name"
/>
</div>

<div class="form-group">
  <label for="gender">Gender</label>
  <input
    type="text"
    class="form-control"
    id="gender"
    [(ngModel)]="currentRequirement.gender"
    name="gender"
  />
</div>




    <button class="badge badge-danger mr-2" (click)="deleteRequirement()">
      Delete
    </button>

    <button
      type="submit"
      class="badge badge-success"
      (click)="updateRequirement()"
    >
      Update
    </button>
    <p>{{ message }}</p>

  <div *ngIf="!currentRequirement">
    <br />
    <p>Cannot access this Requirement...</p>
  </div>
`,
  styles: [
  ]
})
export class RequirementDetailsComponent implements OnInit {
  currentRequirement = null;
  message = '';

  constructor(
    private roomService: RequirementsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getRequirement(this.route.snapshot.paramMap.get('id'));
  }

  getRequirement(id): void {
    this.roomService.get(id)
      .subscribe(
        data => {
          this.currentRequirement = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      first_name: this.currentRequirement.first_name,
      last_name: this.currentRequirement.last_name,
      course: this.currentRequirement.course,
      phone_no: this.currentRequirement.phone_no,
      gender:this.currentRequirement.gender,
      country_name:this.currentRequirement.country_name

    };

    this.roomService.update(this.currentRequirement._id, data)
      .subscribe(
        response => {
          this.currentRequirement.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateRequirement(): void {
    this.roomService.update(this.currentRequirement._id, this.currentRequirement)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The requirement was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteRequirement(): void {
    this.roomService.delete(this.currentRequirement._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/requirements']);
        },
        error => {
          console.log(error);
        });
  }
}
