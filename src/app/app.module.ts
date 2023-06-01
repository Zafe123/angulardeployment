import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Material UI
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeedashboardComponent } from './employeedashboard/employeedashboard.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    EmpAddEditComponent,
    EmployeedashboardComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    UserinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
