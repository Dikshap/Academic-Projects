import { Component, OnInit } from '@angular/core';
import { RequirementsService } from 'src/app/services/requirements.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-requirement',
  templateUrl: './add-requirement.component.html',
  styles: [`
    h4 {
      color: red;
    }
  `
  ]
})

export class AddRequirementComponent implements OnInit {
  selectedUsers = [];


  requirement = {
    first_name : '', //address
    last_name: '',//description
    course: '',//price
    phone_no: '',//availability
    country_name:'',//image
    gender:''//lease_period



  };
  submitted = false;
  constructor(private requirementService: RequirementsService) { }

  ngOnInit(): void {
  }
  saveRequirement(): void {
    const data = {
      first_name:this.requirement.first_name,
      last_name:this.requirement.last_name,
      course:this.requirement.course,
      phone_no:this.requirement.phone_no,
      country_name:this.requirement.country_name,
      gender:this.requirement.gender

    };

    this.requirementService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newRequirement(): void {
    this.submitted = false;
    this.requirement = {
      first_name: '',
      last_name: '',
      course: '',
      phone_no: '',
      country_name:'',
      gender:''
    };
  }

}
