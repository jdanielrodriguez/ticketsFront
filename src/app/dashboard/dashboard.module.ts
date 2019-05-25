import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadersCssModule } from 'angular2-loaders-css';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTableModule } from 'angular-6-datatable';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import {TooltipModule} from 'ng2-tooltip-directive';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { BisService } from './../home/_services/bis.service';
import { UsersService } from './../home/_services/users.service';
import { AuthGuard } from './../home/_guards/auth.guard';
import { HomeGuard } from './../home/_guards/home.guard';
import { GlobalsService } from '../home/_services/globals.service';
import { ProjectsService } from '../home/_services/projects.service';
import { OffersService } from '../home/_services/offers.service';
import { CotizacionesService } from '../home/_services/cotizaciones.service';
import { AuthService } from '../home/_services/auth.service';
import { OrdersService } from '../home/_services/orders.service';

import { LoaderComponent } from './loader/loader.component';
import { DeniedBisComponent } from './denied-bis/denied-bis.component';
import { BuyersComponent } from './buyers/buyers.component';
import { SellersComponent } from './sellers/sellers.component';
import { ActiveProductsComponent } from './active-products/active-products.component';
import { BuyersRequestComponent } from './buyers-request/buyers-request.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { InboxComponent } from './inbox/inbox.component';
import { HomeComponent } from './home/home.component';
import { DraftsBisComponent } from './drafts-bis/drafts-bis.component';
import { ActiveBisComponent } from './active-bis/active-bis.component';
import { CompletedOrdersSellingComponent } from './completed-orders-selling/completed-orders-selling.component';
import { CompletedOrdersBuyingComponent } from './completed-orders-buying/completed-orders-buying.component';
import { DeliveredOrdersSellingComponent } from './delivered-orders-selling/delivered-orders-selling.component';
import { DeliveredOrdersBuyingComponent } from './delivered-orders-buying/delivered-orders-buying.component';
import { CanceledOrdersSellingComponent } from './canceled-orders-selling/canceled-orders-selling.component';
import { CanceledOrdersBuyingComponent } from './canceled-orders-buying/canceled-orders-buying.component';
import { ActiveOrdersSellingComponent } from './active-orders-selling/active-orders-selling.component';
import { ActiveOrdersBuyingComponent } from './active-orders-buying/active-orders-buying.component';
import { MyRequestComponent } from './my-request/my-request.component';
import { ProjectsOffersComponent } from './projects-offers/projects-offers.component';

import { MyProjectsComponent } from './my-projects/my-projects.component';
import { DisabledBisComponent } from './disabled-bis/disabled-bis.component';
import { OffersComponent } from './offers/offers.component';
import { BlockUIModule } from 'ng-block-ui';

/*Share Components */
import { DashboardNavBarComponent } from '../share/dashboard-nav-bar/dashboard-nav-bar.component';
import {ToolsNavBarComponent} from '../share/tools-nav-bar/tools-nav-bar.component';

// Tools
import { ToolsGrowComponent } from '../dashboard/tools-grow/tools-grow.component';
import { BenefitsComponent } from '../dashboard/tools-grow/benefits/benefits.component';
import { ToolsComponent } from '../dashboard/tools-grow/tools/tools.component';
import { BenefitsService } from '../home/_services/benefits.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SimpleNotificationsModule.forRoot(),
    BlockUIModule,
    LoadersCssModule,
    Ng2SearchPipeModule,
    DataTableModule,
    ChartsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    DeniedBisComponent,
    BuyersComponent,
    LoaderComponent,
    SellersComponent,
    ActiveProductsComponent,
    BuyersRequestComponent,
    AnalyticsComponent,
    InboxComponent,
    HomeComponent,
    DraftsBisComponent,
    ActiveBisComponent,
    CompletedOrdersSellingComponent,
    CompletedOrdersBuyingComponent,
    DeliveredOrdersSellingComponent,
    DeliveredOrdersBuyingComponent,
    CanceledOrdersSellingComponent,
    CanceledOrdersBuyingComponent,
    ActiveOrdersSellingComponent,
    ActiveOrdersBuyingComponent,
    MyRequestComponent,
    ProjectsOffersComponent,
    MyProjectsComponent,
    DisabledBisComponent,
    OffersComponent,
    DashboardNavBarComponent,
    ToolsNavBarComponent,
    BenefitsComponent,
    ToolsGrowComponent,
    ToolsComponent
  ],
  providers:[
    BisService,
    AuthGuard,
    UsersService,
    HomeGuard,
    ProjectsService,
    GlobalsService,
    OffersService,
    CotizacionesService,
    AuthService,
    OrdersService,
    BenefitsService

  ]
})
export class DashboardModule { }
