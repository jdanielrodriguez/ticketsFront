import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from "./../../_services/users.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  SelectedData:any = null;
  CurrentAddress:string = '';
  id:any = localStorage.getItem('currentId');
  @BlockUI() blockUI: NgBlockUI;
  rowsItems:any=[
    {id:1}
  ]
  agregar(){
    let id = ((this.rowsItems[this.rowsItems.length-1].id)*1)+1
    this.rowsItems.push({id:id})
  }

  agregarDireccion(){
    this.blockUI.start();
    this.id = localStorage.getItem('currentId');

    let data = {
      usuarioId: +this.id,
      telefono: null,
      direccion: this.CurrentAddress,
      titulo: this.CurrentAddress,
      latitud: null,
      longitud: null,
      estado: true
    }

    // console.log(data);
    this.UsersService.addAddress(data)
                      .then( response => {
                        this.SelectedData.Direcciones.push(response)
                        this.blockUI.stop();
                        this.CurrentAddress = '';
                      })
                      .catch( error => {
                        this.blockUI.stop();
                        this.createError(error)
                      })
  }

  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private UsersService:UsersService,
    ) { }

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.cargarOne();
  }

  cargarOne(){
    this.blockUI.start();
    this.id = localStorage.getItem('currentId');
    this.SelectedData = null;
    this.UsersService.getSingle(this.id)
                    .then(response => {
                      this.SelectedData = response;
                      this.SelectedData.birthday = response.birthday?response.birthday.substr(0,10):'';
                      this.SelectedData.apellido = ((this.SelectedData.primerApellido)?this.SelectedData.primerApellido:'')+' '+((this.SelectedData.segundoApellido)?this.SelectedData.segundoApellido:'')
                      this.SelectedData.nombre = ((this.SelectedData.primerNombre)?this.SelectedData.primerNombre:'')+' '+((this.SelectedData.segundoNombre)?this.SelectedData.segundoNombre:'')
                      console.log(response);

                      this.blockUI.stop();
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop();
                      this.createError(error)
                    })
  }

  update(formValue:any){
    this.blockUI.start();
    formValue.id = localStorage.getItem('currentId');
    let nombres = formValue.nombre.split(' ')
    let apellidos = formValue.apellido.split(' ')
    this.SelectedData.primerNombre = nombres[0] ;
    this.SelectedData.segundoNombre = nombres[1] ;
    this.SelectedData.primerApellido = apellidos[0] ;
    this.SelectedData.segundoApellido = apellidos[1] ;
    this.SelectedData.descripcion = formValue.descripcion ;
    this.SelectedData.id = formValue.id ;
    formValue=this.SelectedData;
    // console.log(formValue);

    this.UsersService.update(formValue)
                      .then(response => {
                        this.createSuccess('Profile Saved')
                        this.SelectedData = response
                        this.SelectedData.birthday = response.birthday?response.birthday.substr(0,10):'';
                        this.SelectedData.apellido = ((this.SelectedData.primerApellido)?this.SelectedData.primerApellido:'')+' '+((this.SelectedData.segundoApellido)?this.SelectedData.segundoApellido:'')
                        this.SelectedData.nombre = ((this.SelectedData.primerNombre)?this.SelectedData.primerNombre:'')+' '+((this.SelectedData.segundoNombre)?this.SelectedData.segundoNombre:'')

                        // console.log(this.SelectedData);

                        console.clear


                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })


  }

  public options = {
      position: ['bottom', 'right'],
      timeOut: 2000,
      lastOnBottom: false,
      animate: 'fromLeft',
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true,
      maxLength: 200
  };

  createSuccess(success) {
        this._service.success('¡Éxito!', success);

  }
  createError(error) {
        this._service.error('¡Error!', error);

  }



}
