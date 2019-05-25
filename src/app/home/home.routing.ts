import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav.component';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';

import { HomeGuard } from "./_guards/home.guard";
import { AuthGuard } from "./_guards/auth.guard";

const routes: Routes = [
  { path: '', component: MainComponent , pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
  { path: 'recovery', component: RecoveryComponent, canActivate: [HomeGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [HomeGuard] },
  { path: '**', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
