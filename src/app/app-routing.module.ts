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
import { PriestSetupComponent } from './components/priest/setup.component';
import { ReferencePujaComponent } from './components/reference/puja.component';
import { ReferenceEditComponent } from './components/reference/puja.edit.component';
import { FacilitiesAgreementComponent } from './components/facilities/agreement.component';
import { FacilitiesSDComponent } from './components/facilities/sd.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'user', component: UserHomeComponent}, 
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'priest/home', component: PriestHomeComponent}, 
  { path: 'priest/edit/:id', component: PriestEditComponent },
  { path: 'priest/setup', component: PriestSetupComponent },
  { path: 'facilities/home', component: FacilitiesHomeComponent}, 
  { path: 'facilities/sd', component: FacilitiesSDComponent}, 
  { path: 'facilities/agreement', component: FacilitiesAgreementComponent}, 
  { path: 'facilities/edit/:id', component: FacilitiesEditComponent },
  { path: 'changepassword', component: ChangepasswordComponent},
  { path: 'upload', component: UploadComponent},
  { path: 'verify/:key', component: VerifyComponent},
  { path: 'reference/puja', component: ReferencePujaComponent}, 
  { path: 'reference/puja/edit/:id', component: ReferenceEditComponent },
  { path: 'module', component: ModuleComponent},
  { path: 'home', component: HomeComponent,
  children: [
   ] },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
