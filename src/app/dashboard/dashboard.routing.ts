import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ActiveBisComponent } from './active-bis/active-bis.component';
import { ActiveOrdersBuyingComponent } from './active-orders-buying/active-orders-buying.component';
import { ActiveOrdersSellingComponent } from './active-orders-selling/active-orders-selling.component';
import { ActiveProductsComponent } from './active-products/active-products.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { BuyersComponent } from './buyers/buyers.component';
import { BuyersRequestComponent } from './buyers-request/buyers-request.component';
import { CanceledOrdersSellingComponent } from './canceled-orders-selling/canceled-orders-selling.component';
import { CanceledOrdersBuyingComponent } from './canceled-orders-buying/canceled-orders-buying.component';
import { CompletedOrdersSellingComponent } from './completed-orders-selling/completed-orders-selling.component';
import { CompletedOrdersBuyingComponent } from './completed-orders-buying/completed-orders-buying.component';
import { DeliveredOrdersSellingComponent } from './delivered-orders-selling/delivered-orders-selling.component';
import { DeliveredOrdersBuyingComponent } from './delivered-orders-buying/delivered-orders-buying.component';
import { DeniedBisComponent } from './denied-bis/denied-bis.component';
import { DraftsBisComponent } from './drafts-bis/drafts-bis.component';
import { HomeComponent } from './home/home.component';
import { InboxComponent } from './inbox/inbox.component';
import { MyRequestComponent } from './my-request/my-request.component';
import { ProjectsOffersComponent } from './projects-offers/projects-offers.component';
import { SellersComponent } from './sellers/sellers.component';
  
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { DisabledBisComponent } from './disabled-bis/disabled-bis.component';
import { OffersComponent } from './offers/offers.component';

//Tools
import { BenefitsComponent } from './tools-grow/benefits/benefits.component';
import { ToolsComponent } from './tools-grow/tools/tools.component';

import { AuthGuard } from "../home/_guards/auth.guard";

const routes: Routes = [
  { path: 'home', component: HomeComponent  },
  { path: 'inbox', component: InboxComponent },
  { path: 'sellers', component: SellersComponent},
  { path: 'products/active', component: ActiveProductsComponent },
  { path: 'buyers', component: BuyersComponent },
  
  { path: 'tools/grow', component: ToolsComponent },
  { path: 'tools/benefits', component: BenefitsComponent},

  { path: 'bis/active', component: ActiveBisComponent },
  { path: 'bis/denied', component: DeniedBisComponent  },
  { path: 'bis/draft', component: DraftsBisComponent },
  { path: 'bis/disabled', component: DisabledBisComponent},
  { path: 'bis/analytics', component: AnalyticsComponent },
  
  { path: 'buying/active-orders', component: ActiveOrdersBuyingComponent },
  { path: 'buying/canceled-orders', component: CanceledOrdersBuyingComponent },
  { path: 'buying/completed-orders', component: CompletedOrdersBuyingComponent },
  { path: 'buying/delivered-orders', component: DeliveredOrdersBuyingComponent },
  { path: 'buying/my-requests', component: MyRequestComponent },
  { path: 'buying/my-requests/:id', component: MyRequestComponent },
  { path: 'buying/projects-offers/:id', component: ProjectsOffersComponent },
  { path: 'buying/my-projects', component: MyProjectsComponent },
  
  { path: 'selling/active-orders', component: ActiveOrdersSellingComponent },
  { path: 'selling/buyers-request', component: BuyersRequestComponent },
  { path: 'selling/canceled-orders', component: CanceledOrdersSellingComponent },
  { path: 'selling/completed-orders', component: CompletedOrdersSellingComponent },
  { path: 'selling/delivered-orders', component: DeliveredOrdersSellingComponent },
  { path: 'selling/offers', component: OffersComponent },
  
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home' , pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
