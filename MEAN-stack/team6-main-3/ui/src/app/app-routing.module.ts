import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { ScholarshipinfoComponent } from './components/scholarshipinfo/scholarshipinfo.component';
import { AboutComponent } from './components/about/about.component';
import { AddRequirementComponent } from './components/add-requirement/add-requirement.component';
import { RequirementsService } from 'src/app/services/requirements.service';
import { RequirementsListComponent } from './components/student-list/student-list.component';
import { RequirementDetailsComponent } from './components/student-details/student-details.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'rooms', component: RoomsListComponent },
{ path: 'rooms/:id', component: RoomDetailsComponent },
{ path: 'add', component: AddRoomComponent },
{ path: 'scholarshipinfo', component: ScholarshipinfoComponent },
{ path: 'about', component: AboutComponent },
{ path: 'add-requirement', component: AddRequirementComponent },
{ path: 'requirements', component: RequirementsListComponent },
{ path: 'requirements/:id', component: RequirementDetailsComponent },
{ path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
