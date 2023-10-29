import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterComponent } from './components/router/router.component';
import { NavbarComponent } from './components/common/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './app.interceptor';
import { CommonService } from './services/common.service';
import { PriestService } from './services/priest.service';
import { FacilitiesService } from './services/facilities.service';
import { Nophoto } from './services/nophoto';
import { HomeComponent } from './components/home/home.component';
import { UserHomeComponent } from './components/user/home.component';
import { LogoutComponent } from './components/login/logout.component';
import { UserEditComponent } from './components/user/edit.component';
import { PriestHomeComponent } from './components/priest/home.component';
import { PriestEditComponent } from './components/priest/edit.component';
import { ReferencePujaComponent } from './components/reference/puja.component';
import { ReferenceEditComponent } from './components/reference/puja.edit.component';
import { PriestSetupComponent } from './components/priest/setup.component';

import { FacilitiesHomeComponent } from './components/facilities/home.component';
import { FacilitiesEditComponent } from './components/facilities/edit.component';
import { FacilitiesAgreementComponent } from './components/facilities/agreement.component';
import { FacilitiesSDComponent } from './components/facilities/sd.component';
import { LoginComponent } from './components/login/login.component';
import { ChangepasswordComponent } from './components/user/changepassword.component';
import { ModuleComponent } from './components/common/module.component';
import { VerifyComponent } from './components/login/verify.component';
import { UploadComponent } from './components/upload/upload.component';
import { ModalmComponent } from './components/common/modalm.component';

@NgModule({
  declarations: [
    AppComponent,
    RouterComponent,
    NavbarComponent,
    HomeComponent,
    UserHomeComponent,
    UserEditComponent,
    LoginComponent,
    UserHomeComponent,
    ChangepasswordComponent,
    ModuleComponent,
    ModalmComponent,
    VerifyComponent,
    UploadComponent,
    PriestHomeComponent,
    PriestEditComponent,
    PriestSetupComponent,
    ReferencePujaComponent,
    ReferenceEditComponent,
    FacilitiesHomeComponent,
    FacilitiesEditComponent,
    FacilitiesSDComponent,
    FacilitiesAgreementComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [ NavbarComponent ],
  providers: [CommonService,PriestService,FacilitiesService, Nophoto,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
   bootstrap: [AppComponent]
})
export class AppModule { }
