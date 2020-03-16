import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadersCssModule } from 'angular2-loaders-css';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DataTableModule } from 'angular-6-datatable';
import {TooltipModule} from 'ng2-tooltip-directive';
import {NgbModule,NgbCarousel} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AuthServices } from './_services/auth.service';
import { AuthGuard } from './../home/_guards/auth.guard';
import { HomeGuard } from './../home/_guards/home.guard';
import { HomeRoutingModule } from './home.routing';
import { NouisliderModule } from 'ng2-nouislider';

import { UsersService } from './_services/users.service';
import { GlobalsService } from './_services/globals.service';
import { EventosFuncionesAreaService } from './_services/eventos-funciones-area.service';
import { EventosFuncionesAreaLugarService } from './_services/eventos-funciones-area-lugar.service';
import { EventosFuncionesService } from './_services/eventos-funciones.service';
import { EventosVentasService } from './_services/eventos-ventas.service';
import { EventosService } from './_services/eventos.service';

import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { EventoComponent } from './evento/evento.component';
import { LocalidadesComponent } from './localidades/localidades.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ComprobanteComponent } from './comprobante/comprobante.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
export function socialConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2623112158004283')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('309393598395-97un2nglv8ccjflbamd90f6f0p0m9c9n.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    HttpClientModule,
    NgxPayPalModule,
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
    NgbModule,
    // Ng5SliderModule,
    HomeRoutingModule,
    DataTableModule
  ],
  declarations: [
    LoginComponent,
    LoaderComponent,
    RegisterComponent,
    RecoveryComponent,
    MainComponent,
    EventoComponent,
    LocalidadesComponent,
    CheckoutComponent,
    ComprobanteComponent,
    ConocenosComponent,
  ],
  providers: [
    AuthServices,
    UsersService,
    EventosService,
    EventosFuncionesService,
    AuthGuard,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    } ,
    EventosVentasService,
    HomeGuard,
    EventosFuncionesAreaService,
    EventosFuncionesAreaLugarService,
    GlobalsService,
  ]
})
export class HomeModule { }
