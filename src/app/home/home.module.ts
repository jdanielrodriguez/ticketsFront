import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadersCssModule } from 'angular2-loaders-css';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DataTableModule } from 'angular-6-datatable';
import {TooltipModule} from 'ng2-tooltip-directive';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


import { AuthService } from './_services/auth.service';
import { AuthGuard } from './../home/_guards/auth.guard';
import { HomeGuard } from './../home/_guards/home.guard';
// import { Ng5SliderModule } from "ng5-slider";
import { HomeRoutingModule } from './home.routing';
// import { NavComponent } from './nav.component';
import { NouisliderModule } from 'ng2-nouislider';

import { UsersService } from './_services/users.service';
import { CategorysService } from './_services/categorys.service';
import { AdministradoresService } from './_services/administradores.service';
import { ProjectsService } from './_services/projects.service';
import { OffersService } from './_services/offers.service';
import { SubCategorysService } from './_services/sub-categorys.service';
import { BisService } from './_services/bis.service';
import { GlobalsService } from './_services/globals.service';
import { SlidesService } from './_services/slides.service';
import { CotizacionesService } from './_services/cotizaciones.service';
import { PaisMethodService } from './_services/pais-method.service';
import { MembresiasService } from './_services/membresias.service';
import { OrdersService } from './_services/orders.service';
import { ParnertsService } from './_services/parnerts.service';

import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ResultsComponent } from './results/results.component';
import { DetailSellerComponent } from './detail-seller/detail-seller.component';
import { DetailBisComponent } from './detail-bis/detail-bis.component';
import { CompareSellerComponent } from './compare-seller/compare-seller.component';
import { PostProjectComponent } from './post-project/post-project.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { ContactSellerComponent } from './contact-seller/contact-seller.component';
import { MembershipbillComponent } from './profile/membershipbill/membershipbill.component';
import { MainskillsComponent } from './profile/mainskills/mainskills.component';
import { VerifiedComponent } from './profile/verified/verified.component';
import { ReferencesComponent } from './profile/references/references.component';
import { GovernmentComponent } from './profile/government/government.component';
import { ChangeemailComponent } from './settings/changeemail/changeemail.component';
import { ChangepasswordComponent } from './settings/changepassword/changepassword.component';
import { BillingComponent } from './settings/billing/billing.component';
import { PlansComponent } from './settings/plans/plans.component';
import { ReviewComponent } from './settings/review/review.component';
import { PaidMethodComponent } from './paid/paid-method/paid-method.component';
import { ChoosePaidMethodComponent } from './paid/choose-paid-method/choose-paid-method.component';
import { CreateComponent } from './bis/create/create.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { CreateLComponent } from './landing/create-l/create-l.component';
import { BecomeSellerComponent } from './become-seller/become-seller.component';
import { CheckoutComponent } from './paid/checkout/checkout.component';
import { CheckoutDetailComponent } from './paid/checkout-detail/checkout-detail.component';
import { ReferencesPrivateComponent } from './settings/references-private/references-private.component';
import { ResultCatComponent } from './result-cat/result-cat.component';
import { InvoiceComponent } from './paid/invoice/invoice.component';
import { InvoiceInfComponent } from './paid/invoice-inf/invoice-inf.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProjectsComponent } from './projects/projects.component';
import { BisCardComponent} from '../share/bis-card/bis-card.component';
import { ContactSellersComponent } from './contact-sellers/contact-sellers.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SimpleNotificationsModule.forRoot(),
    LoadersCssModule,
    NouisliderModule,
    // Ng5SliderModule,
    Ng2SearchPipeModule,
    HomeRoutingModule,
    DataTableModule
  ],
  declarations: [
    LoginComponent,
    LoaderComponent,
    RegisterComponent,
    RecoveryComponent,
    MainComponent,
    ResultsComponent,
    DetailSellerComponent,
    DetailBisComponent,
    CompareSellerComponent,
    PostProjectComponent,
    CreateOfferComponent,
    ContactSellerComponent,
    MembershipbillComponent,
    MainskillsComponent,
    VerifiedComponent,
    ReferencesComponent,
    GovernmentComponent,
    ChangeemailComponent,
    ChangepasswordComponent,
    BillingComponent,
    PlansComponent,
    ReviewComponent,
    PaidMethodComponent,
    ChoosePaidMethodComponent,
    CreateComponent,
    ProfileComponent,
    CreateLComponent,
    BecomeSellerComponent,
    CheckoutComponent,
    CheckoutDetailComponent,
    ReferencesPrivateComponent,
    ResultCatComponent,
    InvoiceComponent,
    InvoiceInfComponent,
    CatalogComponent,
    ProjectsComponent,
    BisCardComponent,
    ContactSellersComponent
  ],
  providers: [
    AuthService,
    UsersService,
    CategorysService,
    AdministradoresService,
    ProjectsService,
    OffersService,
    AuthGuard,
    HomeGuard,
    SubCategorysService,
    GlobalsService,
    BisService,
    CotizacionesService,
    SlidesService,
    MembresiasService,
    PaisMethodService,
    ParnertsService,
    OrdersService
  ]
})
export class HomeModule { }
