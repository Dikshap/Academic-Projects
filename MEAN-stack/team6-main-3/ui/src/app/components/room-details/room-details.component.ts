import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room-details',
  template: `
  <div style="width: 400px; margin: auto;">
  <div *ngIf="currentRoom" class="edit-form">
    <h4>Room</h4>
    <form>
      <div class="form-group">
        <label for="address">Address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          [(ngModel)]="currentRoom.address"
          name="address"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          [(ngModel)]="currentRoom.description"
          name="description"
        />
      </div>


      <div class="form-group">
      <label for="price">Price</label>
      <input
        type="text"
        class="form-control"
        id="price"
        [(ngModel)]="currentRoom.price"
        name="price"
      />
    </div>


    <div class="form-group">
    <label for="availability">Availability</label>
    <input
      type="text"
      class="form-control"
      id="availability"
      [(ngModel)]="currentRoom.availability"
      name="availability"
    />
  </div>


  <div class="form-group">
  <label for="image">Image</label>
  <input
    type="text"
    class="form-control"
    id="image"
    [(ngModel)]="currentRoom.image"
    name="image"
  />
</div>


<div class="form-group">
<label for="lease_period">Lease Period</label>
<input
  type="text"
  class="form-control"
  id="lease_period"
  [(ngModel)]="currentRoom.lease_period"
  name="lease_period"
/>
</div>



    <button
      class="badge badge-primary mr-2"
      *ngIf="currentRoom.published"
      (click)="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      *ngIf="!currentRoom.published"
      class="badge badge-primary mr-2"
      (click)="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" (click)="deleteRoom()">
      Delete
    </button>

    <button
      type="submit"
      class="badge badge-success"
      (click)="updateRoom()"
    >
      Update
    </button>
    <p>{{ message }}</p>

  <div *ngIf="!currentRoom">
    <br />
    <p>Cannot access this Room...</p>
  </div>
`,
  styles: [
  ]
})
export class RoomDetailsComponent implements OnInit {
  currentRoom = null;
  message = '';

  constructor(
    private roomService: RoomsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getRoom(this.route.snapshot.paramMap.get('id'));
  }

  getRoom(id): void {
    this.roomService.get(id)
      .subscribe(
        data => {
          this.currentRoom = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      address: this.currentRoom.address,
      description: this.currentRoom.description,
      price: this.currentRoom.price,
      availability: this.currentRoom.availability,
      image:this.currentRoom.image,
      lease_period:this.currentRoom.lease_period

    };

    this.roomService.update(this.currentRoom._id, data)
      .subscribe(
        response => {
          this.currentRoom.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateRoom(): void {
    this.roomService.update(this.currentRoom._id, this.currentRoom)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The room was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteRoom(): void {
    this.roomService.delete(this.currentRoom._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/rooms']);
        },
        error => {
          console.log(error);
        });
  }
}
