import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VisitorComponent } from './visitor/visitor.component';
import { ProfileComponent } from './profile/profile.component';
import { ObjectsComponent } from './objects/objects.component';
import { CanvasComponent } from './canvas/canvas.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { ObjectSketchComponent } from './object-sketch/object-sketch.component';
import { AgencyListComponent } from './agency-list/agency-list.component';
import { MakeRequestComponent } from './make-request/make-request.component';
import { ClientJobsComponent } from './client-jobs/client-jobs.component';
import { CommentComponent } from './comment/comment.component';
import { ShowProgressComponent } from './show-progress/show-progress.component';
import { AgencyJobsComponent } from './agency-jobs/agency-jobs.component';
import { RegisterRequestsComponent } from './register-requests/register-requests.component';
import { AdminShowAllComponent } from './admin-show-all/admin-show-all.component';
import { EditComponent } from './edit/edit.component';
import { AdminWorkersComponent } from './admin-workers/admin-workers.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';
import { ShowCommentsComponent } from './show-comments/show-comments.component';

const routes: Routes = [
  {path:'',component:VisitorComponent},
  {path:'login',component:LoginComponent},
  {path:'client',component:ClientComponent},
  {path:'agency',component:AgencyComponent},
  {path:'admin',component:AdminComponent},
  {path:'adminLogin',component:AdminLoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'changePassword',component:ChangePasswordComponent},
  {path:'profile',component:ProfileComponent},
  {path:'objects',component:ObjectsComponent},
  {path:'canvas',component:CanvasComponent},
  {path:'addObject',component:AddObjectComponent},
  {path:'mySkatch',component:ObjectSketchComponent},
  {path:'agencyList',component:AgencyListComponent},
  {path:'makeRequest',component:MakeRequestComponent},
  {path:'clientJobs',component:ClientJobsComponent},
  {path:'comment',component:CommentComponent},
  {path:'showProgress',component:ShowProgressComponent},
  {path:'agencyJobs',component:AgencyJobsComponent},
  {path:'registerRequests',component:RegisterRequestsComponent},
  {path:'showAll',component:AdminShowAllComponent},
  {path:'edit',component:EditComponent},
  {path:'adminWorkers',component:AdminWorkersComponent},
  {path:'adminJobs',component:AdminJobsComponent},
  {path:'showComments',component:ShowCommentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
