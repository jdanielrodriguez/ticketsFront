import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaisMethodService } from "./../../_services/pais-method.service";
import { UsersService } from "./../../_services/users.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any
@Component({
  selector: 'app-paid-method',
  templateUrl: './paid-method.component.html',
  styleUrls: ['./paid-method.component.css']
})
export class PaidMethodComponent implements OnInit {

  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  bisCardActiva = localStorage.getItem('currentBisCardId');
  title:string = "Active Bis"
  id:any = localStorage.getItem('currentId');
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit() {
    this.id = localStorage.getItem('currentId');
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.cargarAll();
    this.cargarSingle(this.id);
  }
  Table:any;
  selected:boolean = false;
  comboParent:any
  selectedData:any
  public rowsOnPage = 5;
  public search:any
  constructor(
      private _service: NotificationsService,
      private location: Location,
      private mainService: PaisMethodService,
      private UsersService: UsersService
    ) { }

goBack(){
  this.location.back();
}
  select(dat:boolean){
    this.selected = dat;
  }

  cargarAll(){
    this.id = localStorage.getItem('currentId');
    this.blockUI.start();
    this.mainService.getAllMine(this.id)
                      .then(response => {
                        this.Table = response
// console.log(response);

                        this.blockUI.stop();

                        console.clear
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        // this.createError(error)
                      })
  }

  cargarSingle(id:number){
    this.id = localStorage.getItem('currentId');
    this.blockUI.start();
    this.UsersService.getSingle(this.id)
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
        this.createSuccess('Bienvenido a Bishound')

        this.blockUI.stop();
    }, 1000);


    // this.mainService.create(formValue)
    //                   .then(response => {
    //                     $("#emailSignUpModal").modal('hide');
    //                     this.cargarAll()
    //                     this.createSuccess('Tipo de Equipos Ingresado')
    //                     console.clear
    //
    //                     this.blockUI.stop();
    //                   }).catch(error => {
    //                     console.clear
    //
    //                     this.blockUI.stop();
    //                     this.createError(error)
    //                   })


  }
  delete(id:string){
    this.blockUI.start();
    if(confirm("Do you want delete your BisCard Number?")){
    this.selectedData.bisCardId2 = this.selectedData.bisCardId;
    this.selectedData.bisCardId = null;
    this.selectedData.tipoUsuarioId = 1;
    this.UsersService.update(this.selectedData)
                      .then(response => {
                        this.selectedData = response;
                        localStorage.setItem('currentTipoUsuarioId', response.tipoUsuarioId);
                        this.tipoUsuario = response.tipoUsuarioId
                        this.cargarAll()
                        this.createSuccess('BisCard was deleted')
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
              animate: "fromLeft",
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
