import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/home/page-not-found.component';
import { UserEditComponent } from './components/user/edit.component';
import { UserHomeComponent } from './components/user/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/login/logout.component';
import { ChangepasswordComponent } from './components/user/changepassword.component';
import { ModuleComponent } from './components/common/module.component';
import { VerifyComponent } from './components/login/verify.component';
import { UploadComponent } from './components/upload/upload.component';
import { PriestHomeComponent } from './components/priest/home.component';
import { PriestEditComponent } from './components/priest/edit.component';
import { FacilitiesHomeComponent } from './components/facilities/home.component';
import { FacilitiesEditComponent } from './components/facilities/edit.component';
import { ReferencePujaComponent } from './components/reference/puja.component';
import { ReferenceEditComponent } from './components/reference/puja.edit.component';
import { FacilitiesAgreementComponent } from './components/facilities/agreement.component';
import { FacilitiesSDComponent } from './components/facilities/sd.component';
import { ReferenceServiceTypeComponent } from './components/reference/sevicetype.component';
import { SetupComponent } from './components/setup/setup.component';
import { CustomerLoginComponent } from './components/customer/login.component';
import { CustomerVerifyComponent } from './components/customer/verify.component';
import { CustomerChangepasswordComponent } from './components/customer/changepassword.component';
import { CustomerHistoryComponent } from './components/customer/history.component';
import { EventRequestComponent } from './components/customer/request.component';
import { RegistrationComponent } from './components/customer/registration.component';
import { RegistrationSuccessComponent } from './components/customer/registrationSuccess.component';
import { GuestRequestSuccessComponent } from './components/customer/guestRequestSuccess.component';
import { VastramHomeComponent } from './components/vastram/vastram.component';
import { LotusAcademyHomeComponent } from './components/lotusadacedmy/home.component';
import { LotusAcademyEditComponent } from './components/lotusadacedmy/edit.component';
import { LotusAcademyPaymentComponent } from './components/lotusadacedmy/payment.component';

const appRoutes: Routes = [

  { path: 'customer/login', component: CustomerLoginComponent },
  { path: 'customer/request/:id', component: EventRequestComponent },  
  { path: 'customer/registration', component: RegistrationComponent },  
  { path: 'customer/registrationSuccess', component: RegistrationSuccessComponent },
  { path: 'customer/guestRequestSuccess', component: GuestRequestSuccessComponent },
  { path: 'customer/changepassword', component: CustomerChangepasswordComponent },
  { path: 'customer/history', component: CustomerHistoryComponent },
  { path: 'customer/verify/:key', component: CustomerVerifyComponent},
  { path: 'login/verify/:key', component: VerifyComponent},
  { path: 'login/changepassword', component: ChangepasswordComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'user', component: UserHomeComponent}, 
  { path: 'priest/home', component: PriestHomeComponent}, 
  { path: 'priest/edit/:id', component: PriestEditComponent },
  { path: 'facilities/home', component: FacilitiesHomeComponent}, 
  { path: 'facilities/sd', component: FacilitiesSDComponent}, 
  { path: 'facilities/agreement', component: FacilitiesAgreementComponent}, 
  { path: 'facilities/edit/:id', component: FacilitiesEditComponent },
  { path: 'file/home', component: UploadComponent},
  { path: 'file', component: UploadComponent},
  { path: 'reference/puja', component: ReferencePujaComponent}, 
  { path: 'reference/puja/edit/:id', component: ReferenceEditComponent },
  { path: 'reference/facilities/serviceytpe', component: ReferenceServiceTypeComponent}, 
  { path: 'vastram/home', component: VastramHomeComponent },
  { path: 'lotusacademy/home', component: LotusAcademyHomeComponent },
  { path: 'lotusacademy/edit/:id', component: LotusAcademyEditComponent },
  { path: 'payment/key/:key', component: LotusAcademyPaymentComponent },
  { path: 'module', component: ModuleComponent},
  { path: 'setup', component: SetupComponent},
  { path: 'home', component: HomeComponent},
  { path: '', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
