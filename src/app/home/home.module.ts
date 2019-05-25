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
import { HomeRoutingModule } from './home.routing';
import { NouisliderModule } from 'ng2-nouislider';

import { UsersService } from './_services/users.service';
import { GlobalsService } from './_services/globals.service';

import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './loader/loader.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';

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
  ],
  providers: [
    AuthService,
    UsersService,
    AuthGuard,
    HomeGuard,
    GlobalsService,
  ]
})
export class HomeModule { }
