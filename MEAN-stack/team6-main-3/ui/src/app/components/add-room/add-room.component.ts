import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styles: [`
    h4 {
      color: red;
    }
  `
  ]
})
export class AddRoomComponent implements OnInit {

  room = {
    address: '',
    description: '',
    price: '',
    availability: '',
    image:'',
    lease_period:''
  };
  submitted = false;

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
  }

  saveRoom(): void {
    const data = {
      address:this.room.address,
      description:this.room.description,
      price:this.room.price,
      availability:this.room.availability,
      image:this.room.image,
      lease_period:this.room.lease_period

    };

    this.roomService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newRoom(): void {
    this.submitted = false;
    this.room = {
      address: '',
      description: '',
      price: '',
      availability: '',
      image:'',
      lease_period:''
    };
  }

}