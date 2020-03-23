import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { AuthServices } from "./../_services/auth.service";
import { UsersService } from "./../_services/users.service";

import { NavComponent } from "./../nav.component";

import { NotificationsService } from 'angular2-notifications';

declare var $: any

import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { Socialusers } from "./../../interfaces";
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth:any
  @Input() public isModal: boolean;
  @Input() public idBis: string;
  @BlockUI() blockUI: NgBlockUI;

  response;
    socialusers=new Socialusers();

  constructor(
    private route: ActivatedRoute,
    public OAuth: AuthService,
    private router: Router,
    private authenticationService: AuthServices,
    private UserService: UsersService,
    private _service: NotificationsService,
    private nav:NavComponent
  ) { }

  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: false,
    animate: "scale",
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
};

createSuccess(success) {
      this._service.success('¡Éxito!',success)

}
createError(error) {
      this._service.error('¡Error!',error)

}
public socialSignIn(socialProvider: string) {
  this.blockUI.start();
  let socialPlatformProvider;
  if (socialProvider === 'facebook') {
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  } else if (socialProvider === 'google') {
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  }
  this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
    let data:Socialusers = {
      email:socialusers.email,
      google_id:socialusers.id,
      google_token:socialusers.token,
      password:socialusers.token,
      google_idToken:socialusers.idToken,
      google:socialusers.provider,
      imagen:socialusers.image,
      username:socialusers.email.split("@")[0]

    }
  this.blockUI.stop();
  this.Savesresponse(data);
  });
}
Savesresponse(socialusers: Socialusers) {
  this.blockUI.start();
  this.authenticationService.Authentication(socialusers).then((response: any) => {
    this.auth = response
            if(response.state){
            localStorage.setItem('currentUser', response.username);
            localStorage.setItem('currentEmail', response.email);
            localStorage.setItem('currentId', response.id);
            localStorage.setItem('currentPicture', response.foto);
            localStorage.setItem('currentState', response.state);
            localStorage.setItem('currentEmail', response.email);
            localStorage.setItem('currentApellidos', response.apellidos);
            localStorage.setItem('currentNombres', response.nombres);
            localStorage.setItem('currentAvatar', response.foto);
            localStorage.setItem('currentRol', response.rol);
            localStorage.setItem('token', response.token);
            localStorage.setItem('googleToken', response.googleToken);
            localStorage.setItem('googleidToken', response.googleidToken);
            localStorage.setItem('googleId', response.googleId);
            localStorage.setItem('facebook_id', response.facebook_id);
            setTimeout(element=>{
              $("#rouded-profile").attr("src",response.foto?response.foto:localStorage.getItem('currentAvatar'));
            },500);
            console.clear
            if(this.isModal){
              $('#generalModalDetalle').modal('hide');
              this.blockUI.stop();
              let linkURL = localStorage.getItem('lastLinkUrl');
              if(linkURL){
                localStorage.removeItem('lastLinkUrl');
                this.router.navigate([`${linkURL}`])
              }else{
                this.router.navigate([`./../../contact/seller/${this.idBis}`])
              }
            }else{
                this.blockUI.stop();
                this.router.navigate([`./dashboard/home`])
            }
                this.blockUI.stop();
                this.nav.fullSession(true)
          }else{

                this.blockUI.stop();
            this.createError("Su usuario se encuentra deshabilitado temporalmente")
            setTimeout(() => {
                this.blockUI.stop();
            }, 500);
            // console.log(response);
          }
  }).catch((e)=>{
    console.log(e);
    if(e.status==404){
      this.createError("Usuario no encontrado")

    }else{
      this.createError("Error iniciando sesion")

    }
    this.blockUI.stop();

  })
}

  login(formValue:any){
    this.blockUI.start();
      this.authenticationService.Authentication(formValue)
        .then(response => {
          this.auth = response
            if(response.state){
            localStorage.setItem('currentUser', response.username);
            localStorage.setItem('currentEmail', response.email);
            localStorage.setItem('currentId', response.id);
            localStorage.setItem('currentPicture', response.foto);
            localStorage.setItem('currentState', response.state);
            localStorage.setItem('currentEmail', response.email);
            localStorage.setItem('currentApellidos', response.apellidos);
            localStorage.setItem('currentNombres', response.nombres);
            localStorage.setItem('currentAvatar', response.foto);
            localStorage.setItem('currentRol', response.rol);
            localStorage.setItem('token', response.token);
            setTimeout(element=>{
              $("#rouded-profile").attr("src",response.foto?response.foto:localStorage.getItem('currentAvatar'));
            },500);
            console.clear
            if(this.isModal){
              $('#generalModalDetalle').modal('hide');
              this.blockUI.stop();
              let linkURL = localStorage.getItem('lastLinkUrl');
              if(linkURL){
                localStorage.removeItem('lastLinkUrl');
                this.router.navigate([`${linkURL}`])
              }else{
                this.router.navigate([`./../../contact/seller/${this.idBis}`])
              }
            }else{
                this.blockUI.stop();
                this.router.navigate([`./dashboard/home`])
            }
                this.blockUI.stop();
                this.nav.fullSession(true)
          }else{

                this.blockUI.stop();
            this.createError("Su usuario se encuentra deshabilitado temporalmente")
            setTimeout(() => {
                this.blockUI.stop();
            }, 500);
            // console.log(response);
          }
        }).catch(error => {
            console.clear

            this.blockUI.stop();
          if(error.status==401){
            this.createError("Usuario o Clave incorrectas");
          }else{
            this.createError("Error: please call to support")
            console.log(error);

          }
          setTimeout(() => {
                this.blockUI.stop();
          }, 500);

        })


    }
  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    // TCO.loadPubKey('sandbox');

  }

}
