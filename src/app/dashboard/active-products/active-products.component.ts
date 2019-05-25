import { Component, Input, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NotificationsService } from 'angular2-notifications';
import { BisService } from "../../home/_services/bis.service";
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any
@Component({
  selector: 'app-active-products',
  templateUrl: './active-products.component.html',
  styles: []
})
export class ActiveProductsComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  title:string = "Active Products"
  id:any = localStorage.getItem('currentId');
  @BlockUI() blockUI: NgBlockUI;
  tipoBisId:number = 1

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.cargarAll();
  }
  Table:any;
  selected:boolean = false;
  comboParent:any
  selectedData:any
  public rowsOnPage = 5;
  public search:any
  constructor(
      private _service: NotificationsService,
      private mainService: BisService,
    ) { }


  select(dat:boolean){
    this.selected = dat;
  }

  cargarAll(){
    this.id = localStorage.getItem('currentId');
    this.blockUI.start();

    let data:any = {
      id : this.id,
      tipo: this.tipoBisId
    }
    this.mainService.getAllMine(data)
                      .then(response => {
                        this.Table = response

                        this.blockUI.stop();

                        console.clear
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        // this.createError(error)
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
