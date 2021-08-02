import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-rooms-list',
  template: `
    <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by address"
          [(ngModel)]="address"
        />

        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            (click)="searchAddress()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Rooms List</h4>

      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let room of rooms; let i = index"
          [class.active]="i == currentIndex"
          (click)="setActiveRoom(room, i)"
        >
          <img src="{{ room.image }}" height="200" width="300"/>
          <b>{{ room.address }}</b>
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" (click)="removeAllRooms()">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div *ngIf="currentRoom">
      <h4>Room</h4>
      <div>
        <label><strong>Address:</strong></label> {{ currentRoom.address }}
      </div>
      <div>
        <label><strong>Description:</strong></label>{{ currentRoom.description }}
      </div>

      <div>
        <label><strong>Price:</strong></label>{{ currentRoom.price }}
      </div>

      <div>
        <label><strong>Availability:</strong></label>{{ currentRoom.availability }}
      </div>

      <div>
        <label><strong>Lease Period:</strong></label>{{ currentRoom.lease_period }}
      </div>
        <button class="badge badge-warning" routerLink="/rooms/{{ currentRoom._id }}">
          Edit
        </button>
      </div>

      <div *ngIf="!currentRoom">
        <br />
        <p>Please click on a Room...</p>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class RoomsListComponent implements OnInit {

  rooms: any;
  currentRoom = null;
  currentIndex = -1;
  address = '';

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
    this.retrieveRooms();
  }

  retrieveRooms(): void {
    this.roomService.getAll()
      .subscribe(
        data => {
          this.rooms = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveRooms();
    this.currentRoom = null;
    this.currentIndex = -1;
  }

  setActiveRoom(room, index): void {
    this.currentRoom = room;
    this.currentIndex = index;
  }

  removeAllRooms(): void {
    this.roomService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveRooms();
        },
        error => {
          console.log(error);
        });
  }

  searchAddress(): void {
    this.roomService.findByAddress(this.address)
      .subscribe(
        data => {
          this.rooms = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
