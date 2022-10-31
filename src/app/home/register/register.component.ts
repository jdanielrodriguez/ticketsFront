import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from 'angular2-notifications';
import { UsersService } from "../_services/users.service";
import { AuthServices } from "../_services/auth.service";
declare var $: any
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any

import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';
import { Socialusers } from "./../../interfaces";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selected:boolean = false;
  title:any = "Registro"
  Table:any
  comboParent:any
  @BlockUI() blockUI: NgBlockUI;
  selectedData:any
  today:any
  nacimientoToday:any
  public rowsOnPage = 5;
  public search:any
  constructor(
      private _service: NotificationsService,
      private router: Router,
      private AuthService: AuthServices,
      public OAuth: AuthService,
      private mainService: UsersService,
    ) { }

  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear()-21;
    this.today = yyyy + '-' + mm + '-' + dd;
    this.nacimientoToday = yyyy + '-' + mm + '-' + dd;
  }

  select(dat:boolean){
    this.selected = dat;
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
      let nombres = (socialusers.name.split(" ")[0]?socialusers.name.split(" ")[0]:"")+(socialusers.name.split(" ")[1]?" "+socialusers.name.split(" ")[1]:" ")
      let apellidos = (socialusers.name.split(" ")[3]?socialusers.name.split(" ")[3]:"")+(socialusers.name.split(" ")[4]?" "+socialusers.name.split(" ")[4]:" ")
      console.log(socialusers);

    let string = socialusers.token.substr(0,10)+":"+socialusers.email.split("@")[0];
    let encodedString = btoa(string);

      let data:Socialusers = {
        email:socialusers.email,
        google_id:socialusers.id,
        google_token:socialusers.token,
        password:socialusers.token.substr(0,10),
        google_idToken:socialusers.idToken?socialusers.idToken:null,
        google:socialusers.provider,
        imagen:socialusers.image,
        nombres:nombres,
        codigo:encodedString.substr(encodedString.length-10,encodedString.length),
        state:1,
        apellidos:apellidos,
        username:socialusers.email.split("@")[0]

      }
      this.blockUI.stop();
      this.Savesresponse(data);
    });
  }
  Savesresponse(socialusers: Socialusers) {
      this.blockUI.start();
      this.mainService.create(socialusers).then((response: any) => {
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
              localStorage.setItem('googleToken', response.googleToken);
              localStorage.setItem('googleidToken', response.googleidToken);
              localStorage.setItem('googleId', response.googleId);
              localStorage.setItem('facebook_id', response.facebook_id);
              localStorage.setItem('token', response.token);
              setTimeout(element=>{
                $("#rouded-profile").attr("src",response.foto?response.foto:localStorage.getItem('currentAvatar'));
              },500);
              console.clear
                  this.blockUI.stop();
                  this.router.navigate([`./dashboard/home`])
            }else{

                  this.blockUI.stop();
              this.createError("Su usuario se encuentra deshabilitado temporalmente")
              setTimeout(() => {
                  this.blockUI.stop();
              }, 500);
              // console.log(response);
            }
    }).catch((e)=>{
      // console.log(e);
      if(e.status==400){
        this.createError("Este Usuario ya existe")
      }else{
        this.createError(e);
      }
      this.blockUI.stop();

    })
  }
  cargarAll(){
    this.blockUI.start();
    this.mainService.getAll()
                      .then(response => {
                        this.Table = response

                        this.blockUI.stop();
                        console.clear
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })
  }

  cargarSingle(id:number){
    this.blockUI.start();
    this.mainService.getSingle(id)
                      .then(response => {
                        this.selectedData = response;
                        console.clear

                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })
  }
  update(formValue:any){
    this.blockUI.start();
    //console.log(data)
    this.mainService.update(formValue)
                      .then(response => {
                        $("#editModal .close").click();
                        this.cargarAll()
                        this.createSuccess('Tipo de Equipos Actualizado exitosamente')
                        console.clear

                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })

  }

  insert(formValue:any){
    this.blockUI.start();
    setTimeout(() => {
      $("#emailSignUpModal").modal('hide');
        // this.createSuccess('Welcome to Bishound')

        this.blockUI.stop();
    }, 1000);

    formValue.birthday = formValue.year+"-"+formValue.month+"-"+formValue.day
    formValue.username =  formValue.email.split('@')[0]
    formValue.rol =  2;
    formValue.avatar = 'https://png.icons8.com/find-user-male/color/1600';
    let string = formValue.birthday+":"+formValue.username;
    let encodedString = btoa(string);
    formValue.codigo =  encodedString.substr(encodedString.length-10,encodedString.length);
    this.mainService.create(formValue)
                      .then(async response => {
                        // console.log(response);
                        // this.cargarAll()
                        $("#emailSignUpModal").modal('hide');
                        this.createSuccess('Users created')
                        console.clear
                        localStorage.setItem('currentUser', response.username);
                        localStorage.setItem('currentEmail', response.email);
                        localStorage.setItem('currentId', response.id);
                        localStorage.setItem('currentPicture', response.foto);
                        localStorage.setItem('currentState', response.state);
                        localStorage.setItem('currentEmail', response.email);
                        localStorage.setItem('currentApellidos', response.apellidos);
                        localStorage.setItem('currentNombres', response.nombres);
                        localStorage.setItem('currentAvatar', response.foto);
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('currentRol', response.rol);
                       await this.router.navigate([`./../dashboard/home`])
                        await this.blockUI.stop();

                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        if(error.status==400){
                          this.createError("Este Usuario ya existe")
                        }else{
                          this.createError(error);
                        }
                      })


  }
  delete(id:string){
    this.blockUI.start();
    if(confirm("¿Desea eliminar el Tipo de Equipos?")){
    this.mainService.delete(id)
                      .then(response => {
                        this.cargarAll()
                        this.createSuccess('Tipo de Equipos Eliminado exitosamente')
                        console.clear

                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })
    }else{
                        console.clear

                        this.blockUI.stop();
    }

  }
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
}
