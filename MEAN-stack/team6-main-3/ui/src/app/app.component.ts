import { Component , ViewChild, HostListener, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  template: `<mat-toolbar  class="header">
      <span class="nav-tool-items">
      <mat-icon (click)="sidenav.toggle()" class="hamburger">menu</mat-icon>
      </span>
  <div>
    <a href="#" class="navbar-brand">International Student Services</a>

  </div>
  <div>
    <a href="#" class="navbar-brand">Welcome International Students</a>

  </div>


</mat-toolbar>

<mat-sidenav-container>
  <!-- Sidenav -->
  <mat-sidenav #sidenav [mode]="isBiggerScreen() ? 'over' : 'side'" [(opened)]="opened" [fixedInViewport]="true"
    [fixedTopGap]>
    <mat-nav-list>
      <a href="#" class="navbar-brand">
      <button mat-mini-fab color="warn" aria-label="Example icon button with a filter list icon">
          <mat-icon>filter_list</mat-icon>
        </button>
        Menu
      </a>
      <a mat-list-item routerLinkActive="active" routerLink="/scholarshipinfo">
        <mat-icon >format_list_bulleted</mat-icon> Find Scholarship 
      </a>
      <a mat-list-item routerLinkActive="active" routerLink="/rooms">
        <mat-icon>format_list_bulleted</mat-icon> Home Finder
      </a>
      <a mat-list-item routerLinkActive="active" routerLink="/add-requirement">
        <mat-icon>format_list_bulleted</mat-icon> Student Registration
      </a>
      <a mat-list-item routerLinkActive="active" routerLink="/add">
        <mat-icon>format_list_bulleted</mat-icon> House Registration
      </a>
      <a mat-list-item routerLinkActive="active" routerLink="/requirements">
        <mat-icon>format_list_bulleted</mat-icon> Student List
      </a>
      <a mat-list-item routerLinkActive="active" routerLink="/rooms">
        <mat-icon>format_list_bulleted</mat-icon> House List
      </a>
      
      <a mat-list-item routerLinkActive="active" routerLink="/about">
        <mat-icon>format_list_bulleted</mat-icon> About
      </a>
      <li class="nav-item">
        <app-authentication-button></app-authentication-button>
      </li>

    </mat-nav-list>
  </mat-sidenav>

  <!-- Main content -->


  <mat-sidenav-content>
    <router-outlet ></router-outlet>
  </mat-sidenav-content>


</mat-sidenav-container>
`,
styleUrls: ['./app.component.css']
})
export class AppComponent {

  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

  ngOnInit() {
    console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }

}
