import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NotificationsService } from 'angular2-notifications';
import { BisService } from "../../home/_services/bis.service";
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any
@Component({
  selector: 'app-denied-bis',
  templateUrl: './denied-bis.component.html',
  styles: []
})
export class DeniedBisComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  title:string = "Denied Bis"
  @BlockUI() blockUI: NgBlockUI;

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
    // this.blockUI.start();
    this.mainService.getAll()
                      .then(response => {
                        this.Table = response
                        this.blockUI.stop();
                        console.clear
                      }).catch(error => {
                        console.clear
                        this.Table =
                                [
                                  {
                                    id:1,
                                    nombre:"Bis Title",
                                    canttitl:"Impressions",
                                    cant:95,
                                    favorito:true
                                  },
                                  {
                                    id:2,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:false
                                  },
                                  {
                                    id:3,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:true
                                  },
                                  {
                                    id:4,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:false
                                  },
                                  {
                                    id:5,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:false
                                  },
                                  {
                                    id:6,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:true
                                  },
                                  {
                                    id:7,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:true
                                  },
                                  {
                                    id:8,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:true
                                  },
                                  {
                                    id:9,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:true
                                  },
                                  {
                                    id:10,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:true
                                  },
                                  {
                                    id:11,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:true
                                  },
                                  {
                                    id:12,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:false
                                  },
                                  {
                                    id:13,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:false
                                  },
                                  {
                                    id:14,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:false
                                  },
                                  {
                                    id:15,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:false
                                  },
                                  {
                                    id:16,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:false
                                  },
                                  {
                                    id:17,
                                    nombre:"Bis Title",
                                    canttitl:1,
                                    cant:95,
                                    favorito:false
                                  },
                                ]
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
        this.createSuccess('Bienvenido a Bishound')
        this.blockUI.stop();
    }, 1000);


    // this.mainService.create(formValue)
    //                   .then(response => {
    //                     $("#emailSignUpModal").modal('hide');
    //                     this.cargarAll()
    //                     this.createSuccess('Tipo de Equipos Ingresado')
    //                     console.clear
    //                     this.blockUI.stop();
    //                   }).catch(error => {
    //                     console.clear
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
