import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VisitorComponent } from './visitor/visitor.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import {MatListModule} from '@angular/material/list';
import { ObjectsComponent } from './objects/objects.component';
import {MatTableModule} from '@angular/material/table';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientComponent,
    AgencyComponent,
    RegisterComponent,
    AdminLoginComponent,
    AdminComponent,
    ChangePasswordComponent,
    VisitorComponent,
    MenuComponent,
    ProfileComponent,
    ObjectsComponent,
    CanvasComponent,
    AddObjectComponent,
    ObjectSketchComponent,
    AgencyListComponent,
    MakeRequestComponent,
    ClientJobsComponent,
    CommentComponent,
    ShowProgressComponent,
    AgencyJobsComponent,
    RegisterRequestsComponent,
    AdminShowAllComponent,
    EditComponent,
    AdminWorkersComponent,
    AdminJobsComponent,
    ShowCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
