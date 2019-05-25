import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';

import { AuthGuard } from "../home/_guards/auth.guard";

const routes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: 'inbox', component: InboxComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home' , pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
