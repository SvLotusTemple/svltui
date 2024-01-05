import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterComponent } from './components/router/router.component';
import { NavbarComponent } from './components/home/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './app.interceptor';

import { CommonService } from './services/common.service';
import { DataSharingService } from './services/dataSharing.service';
import { Nophoto } from './services/nophoto';

import { HomeComponent } from './components/home/home.component';
import { UserHomeComponent } from './components/user/home.component';
import { LogoutComponent } from './components/login/logout.component';
import { UserEditComponent } from './components/user/edit.component';
import { PriestHomeComponent } from './components/priest/home.component';
import { PriestEditComponent } from './components/priest/edit.component';
import { ReferencePujaComponent } from './components/reference/puja.component';
import { ReferenceEditComponent } from './components/reference/puja.edit.component';
import { ReferenceServiceTypeComponent } from './components/reference/sevicetype.component';

import { FacilitiesHomeComponent } from './components/facilities/home.component';
import { FacilitiesEditComponent } from './components/facilities/edit.component';
import { FacilitiesAgreementComponent } from './components/facilities/agreement.component';
import { FacilitiesSDComponent } from './components/facilities/sd.component';

import { LoginComponent } from './components/login/login.component';
import { ChangepasswordComponent } from './components/user/changepassword.component';
import { ModuleComponent } from './components/common/module.component';
import { VerifyComponent } from './components/login/verify.component';
import { UploadComponent } from './components/upload/upload.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { SetupComponent } from './components/setup/setup.component';
import { CustomerLoginComponent } from './components/customer/login.component';
import { CustomerChangepasswordComponent } from './components/customer/changepassword.component';
import { CustomerVerifyComponent } from './components/customer/verify.component';
import { CustomerHistoryComponent } from './components/customer/history.component';
import { RegistrationComponent } from './components/customer/registration.component';
import { RegistrationSuccessComponent } from './components/customer/registrationSuccess.component';
import { EventRequestComponent } from './components/customer/request.component';
import { GuestRequestSuccessComponent } from './components/customer/guestRequestSuccess.component';
import { VastramHomeComponent } from './components/vastram/vastram.component';
import { VastramSaleComponent } from './components/vastram/payment.component';
import { LotusAcademyHomeComponent } from './components/lotusadacedmy/home.component';
import { LotusAcademyEditComponent } from './components/lotusadacedmy/edit.component';
import { LotusAcademyPaymentComponent } from './components/lotusadacedmy/payment.component';
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
    CustomerLoginComponent,
    CustomerVerifyComponent,
    CustomerChangepasswordComponent,
    CustomerHistoryComponent,
    RegistrationComponent,
    RegistrationSuccessComponent,
    GuestRequestSuccessComponent,
    ChangepasswordComponent,
    ModuleComponent,
    VerifyComponent,
    UploadComponent,
    SetupComponent,
    PriestHomeComponent,
    PriestEditComponent,
    EventRequestComponent,
    ReferencePujaComponent,
    ReferenceEditComponent,
    ReferenceServiceTypeComponent,
    FacilitiesHomeComponent,
    FacilitiesEditComponent,
    FacilitiesSDComponent,
    FacilitiesAgreementComponent,
    VastramHomeComponent,
    VastramSaleComponent,
    LotusAcademyHomeComponent,
    LotusAcademyEditComponent,
    LotusAcademyPaymentComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  exports: [ NavbarComponent ],
  providers: [CommonService, DataSharingService,Nophoto,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}],
   bootstrap: [AppComponent]
})
export class AppModule { }
