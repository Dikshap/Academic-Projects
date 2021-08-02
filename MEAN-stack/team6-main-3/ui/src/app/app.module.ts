import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { ScholarshipinfoComponent } from './components/scholarshipinfo/scholarshipinfo.component';
import { AngularMaterialModule } from './material.module';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment } from './../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';
import { AddRequirementComponent } from './components/add-requirement/add-requirement.component';
import { RequirementsListComponent } from './components/student-list/student-list.component';
import { RequirementDetailsComponent } from './components/student-details/student-details.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    AuthenticationButtonComponent,
    AddRoomComponent,
    RoomDetailsComponent,
    RoomsListComponent,
    ScholarshipinfoComponent,
    AboutComponent,
    AddRequirementComponent,
    RequirementsListComponent,
    RequirementDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularMaterialModule,
    HttpClientModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-a51xn-8e.us.auth0.com',
      clientId: 'pXNWP2HRCjY9MBssT2qvAM0k6nD0LZY1',
      audience: 'http://localhost:3000/api/rooms',
      httpInterceptor: {
        allowedList: [`http://localhost:3000/api/*`],
      },
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
