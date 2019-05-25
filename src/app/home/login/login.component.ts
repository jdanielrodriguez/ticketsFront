import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { AuthService } from "./../_services/auth.service";
import { UsersService } from "./../_services/users.service";

import { NavComponent } from "./../nav.component";

import { NotificationsService } from 'angular2-notifications';

declare var $: any

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
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

  login(formValue:any){
    //  console.log(`user: ${formValue.username} pass: ${formValue.password}`)
// console.log(formValue);

  this.blockUI.start();

      this.authenticationService.Authentication(formValue)
        .then(response => {

          // if(!response.tipoUsuarioId){
          //   response.tipoUsuarioId = 1;
          //   this.UserService.update(response)
          //             .then(response1 => {
          //               response.tipoUsuarioId = response1.tipoUsuarioId;
          //               localStorage.setItem('currentTipoUsuarioId', response.tipoUsuarioId);
          //               localStorage.setItem('currentId', response.id);
          //               console.clear
          //             }).catch(error => {
          //               console.clear
          //               this.createError(error)
          //             })
          // }

          this.auth = response
            if(response.estado){
            let type:string = '';
            // console.log(response);

            localStorage.setItem('currentUser', response.username);
            localStorage.setItem('currentEmail', response.email);
            localStorage.setItem('currentFirstName', ((response?response.primerNombre:'')));
            localStorage.setItem('currentLastName', ((response?response.primerApellido:'')));
            localStorage.setItem('currentId', response.id);
            localStorage.setItem('currentPicture', response.avatar);
            localStorage.setItem('currentState', response.estado);
            localStorage.setItem('currentUser', response.username);
            localStorage.setItem('currentBisCardId', response.bisCardId);
            localStorage.setItem('currentEmail', response.email);
            localStorage.setItem('currentApellidos', response.primerApellido);
            localStorage.setItem('currentNombres', response.primerNombre);
            localStorage.setItem('currentEstado', response.estado);
            localStorage.setItem('currentSalt', response.salt);
            localStorage.setItem('currentTelefono', response.telefono);
            localStorage.setItem('currentAvatar', response.avatar);
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentNuevaSesion', response.google);
            localStorage.setItem('currentTipoUsuarioId', response.tipoUsuarioId);
            //4c0aNPY0vcYOZ9OUsePT
            type = 'admin';
            // console.log(response.id)
            // console.log(localStorage.getItem('token'))
            setTimeout(element=>{
              $("#rouded-profile").attr("src",response.avatar?response.avatar:localStorage.getItem('currentAvatar'));
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
            // setTimeout(() => {
            //   // this.router.navigate([`./dashboard/home`])
            //     this.blockUI.stop();
            // }, 500);
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
          if(error.status==404){
            this.createError("User or Password incorrect");
          }else{
            this.createError("Error: please call to support")
                this.blockUI.stop();
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
  }

}
