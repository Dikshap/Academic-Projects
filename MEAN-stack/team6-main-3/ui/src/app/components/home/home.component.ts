import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
  <div><img src="assets/img/student.jpeg"> </div>`,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

