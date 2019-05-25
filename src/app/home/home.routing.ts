import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './nav.component';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ResultsComponent } from './results/results.component';
import { DetailBisComponent } from './detail-bis/detail-bis.component';
import { DetailSellerComponent } from './detail-seller/detail-seller.component';
import { CompareSellerComponent } from './compare-seller/compare-seller.component';
import { PostProjectComponent } from './post-project/post-project.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
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
import { CreateLComponent } from './landing/create-l/create-l.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { ContactSellerComponent } from './contact-seller/contact-seller.component';
import { ContactSellersComponent } from './contact-sellers/contact-sellers.component';
import { BecomeSellerComponent } from './become-seller/become-seller.component';
import { ReferencesPrivateComponent } from './settings/references-private/references-private.component';
import { ResultCatComponent } from './result-cat/result-cat.component';
import { CheckoutComponent } from './paid/checkout/checkout.component';
import { CheckoutDetailComponent } from './paid/checkout-detail/checkout-detail.component';
import { InvoiceComponent } from './paid/invoice/invoice.component';
import { InvoiceInfComponent } from './paid/invoice-inf/invoice-inf.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ProjectsComponent } from './projects/projects.component';

import { HomeGuard } from "./_guards/home.guard";
import { AuthGuard } from "./_guards/auth.guard";

const routes: Routes = [
  { path: '', component: MainComponent , pathMatch: 'full'},
  { path: 'search/:type/:searchContent', component: ResultsComponent },
  { path: 'search/:searchContent', component: ResultsComponent },
  { path: 'category/:category/:searchContent', component: ResultCatComponent },
  { path: 'category/:category', component: ResultCatComponent },
  { path: 'search', component: ResultsComponent },
  { path: 'categorys', component: CatalogComponent },
  { path: 'seller/:id', component: DetailSellerComponent },
  { path: 'compare-seller', component: CompareSellerComponent },
  { path: 'create-offer', component: CreateOfferComponent },
  { path: 'project/:id', component: PostProjectComponent, canActivate: [AuthGuard]  },
  { path: ':type/offer/:id', component: CreateOfferComponent, canActivate: [AuthGuard]  },
  { path: 'post-project', component: PostProjectComponent, canActivate: [AuthGuard] },
  { path: 'bis/:id', component: DetailBisComponent },
  { path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
  { path: 'recovery', component: RecoveryComponent, canActivate: [HomeGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [HomeGuard] },
  { path: 'settings', redirectTo: 'settings/profile' },
  { path: 'settings/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'settings/billing', component: BillingComponent, canActivate: [AuthGuard] },
  { path: 'settings/change-email', component: ChangeemailComponent, canActivate: [AuthGuard] },
  { path: 'settings/change-password', component: ChangepasswordComponent, canActivate: [AuthGuard] },
  { path: 'settings/plans', component: PlansComponent, canActivate: [AuthGuard] },
  { path: 'settings/reviews', component: ReviewComponent, canActivate: [AuthGuard] },
  { path: 'profile/upload/:type', component: GovernmentComponent, canActivate: [AuthGuard] },
  { path: 'profile/main-skills', component: MainskillsComponent, canActivate: [AuthGuard] },
  { path: 'profile/membership-bill', component: MembershipbillComponent, canActivate: [AuthGuard] },
  { path: 'profile/references', component: ReferencesComponent, canActivate: [AuthGuard] },
  { path: 'profile/verified', component: VerifiedComponent, canActivate: [AuthGuard] },
  { path: 'paid/chose-paid-method', component: ChoosePaidMethodComponent, canActivate: [AuthGuard] },
  { path: 'paid/chose-paid-method/:id', component: ChoosePaidMethodComponent, canActivate: [AuthGuard] },
  { path: 'paid/paid-method', component: PaidMethodComponent, canActivate: [AuthGuard] },
  { path: 'paid/invoice/:id', component: InvoiceComponent},
  { path: 'paid/invoice-inf/:id', component: InvoiceInfComponent},
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  { path: 'create/bis', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'update/bis/:id', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'create/landing', component: CreateLComponent, canActivate: [AuthGuard] },
  { path: 'create/landing/:id', component: CreateLComponent, canActivate: [AuthGuard] },
  { path: 'contact/seller', component: ContactSellerComponent, canActivate: [AuthGuard] },
  { path: 'contact/seller/:id', component: ContactSellerComponent, canActivate: [AuthGuard] },
  { path: 'contact/sellers/:id', component: ContactSellersComponent, canActivate: [AuthGuard] },
  { path: 'contact/seller/:bis/:id', component: ContactSellerComponent, canActivate: [AuthGuard] },
  { path: 'checkout/:id', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'checkout/detail/:id', component: CheckoutDetailComponent},
  { path: 'checkout/detail/:type/:id', component: CheckoutDetailComponent},
  { path: 'references/:username/:bisID', component: ReferencesPrivateComponent , canActivate: [AuthGuard]},
  { path: 'become-seller', component: BecomeSellerComponent },
  { path: '**', redirectTo: 'main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
