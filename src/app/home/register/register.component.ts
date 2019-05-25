import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationsService } from 'angular2-notifications';
import { UsersService } from "../_services/users.service";
import { AuthService } from "../_services/auth.service";
declare var $: any
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
  birthday:any = {
    month : "Month",
    day : "Day",
    year : "Year"
  }
  months = [
    {
      id:1,
      nombre:"January"
    },
    {
      id:2,
      nombre:"Febrary"
    },
    {
      id:3,
      nombre:"March"
    },
    {
      id:4,
      nombre:"April"
    },
    {
      id:5,
      nombre:"May"
    },
    {
      id:6,
      nombre:"June"
    },
    {
      id:7,
      nombre:"July"
    },
    {
      id:8,
      nombre:"August"
    },
    {
      id:9,
      nombre:"September"
    },
    {
      id:10,
      nombre:"October"
    },
    {
      id:11,
      nombre:"November"
    },
    {
      id:12,
      nombre:"December"
    }
  ]
  days:any=[];
  years:any=[];
  public rowsOnPage = 5;
  public search:any
  constructor(
      private _service: NotificationsService,
      private router: Router,
      private AuthService: AuthService,
      private mainService: UsersService,
    ) { }

  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    for(let i=2020;i>=1900;i--){
      this.years.push({
        id:i
      })
    }
    for(let i=1;i<=31;i++){
      this.days.push({
        id:i
      })
    }
  }

  select(dat:boolean){
    this.selected = dat;
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
    formValue.tipoUsuarioId =  1;
    formValue.avatar = 'https://png.icons8.com/find-user-male/color/1600';
    this.mainService.create(formValue)
                      .then(response => {
                        // console.log(response);
                        // this.cargarAll()
                        $("#emailSignUpModal").modal('hide');
                        this.createSuccess('Users created')
                        console.clear
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
                        this.router.navigate([`./../dashboard/home`])
                        this.blockUI.stop();

                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
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
