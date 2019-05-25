import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { CategorysService } from "./../../_services/categorys.service";
import { NavComponent } from "./../../nav.component";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;

declare var $: any
declare var $: any
@Component({
  selector: 'app-mainskills',
  templateUrl: './mainskills.component.html',
  styleUrls: ['./mainskills.component.css']
})
export class MainskillsComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  Table: any;
  @BlockUI() blockUI: NgBlockUI;type:string = ''
  public _id: number;
  public search: any;
  selectedData: any;
  Id:any = '';

  //Servicio el cual se va a trabajar
  constructor(
    private mainService: CategorysService,
    private parentComponent: NavComponent,
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  //Llamar los metodos que se van a utilizar
  ngOnInit() {
    setTimeout(() => {
      $('#searchContent').addClass('d-none');
      $('#inSeachForm').removeClass('d-none');
      $('#logoTipo').addClass('d-none');
      this.blockUI.stop();
    }, 500);
    this.ngAfterViewInit()
    this.cargarAll();
  }
  ngAfterViewInit() {
    setTimeout(() => {
        // this.parentComponent.searchContent = '';
    });
  }
  agregar(){

  }
  cargarAll(){
    // this.blockUI.start();
    this.Table = [
      {
        id:1,
        descripcion:"sub-category xxx"
      },
      {
        id:2,
        descripcion:"sub-category xxx"
      },
      {
        id:3,
        descripcion:"sub-category xxx"
      },
      {
        id:4,
        descripcion:"sub-category xxx"
      },
      {
        id:5,
        descripcion:"sub-category xxx"
      },
      {
        id:6,
        descripcion:"sub-category xxx"
      },
      {
        id:7,
        descripcion:"sub-category xxx"
      },
      {
        id:8,
        descripcion:"sub-category xxx"
      },
      {
        id:9,
        descripcion:"sub-category xxx"
      },
      {
        id:10,
        descripcion:"sub-category xxx"
      },
      {
        id:11,
        descripcion:"sub-category xxx"
      },
      {
        id:12,
        descripcion:"sub-category xxx"
      },
      {
        id:13,
        descripcion:"sub-category xxx"
      },
      {
        id:14,
        descripcion:"sub-category xxx"
      },
      {
        id:15,
        descripcion:"sub-category xxx"
      },
      {
        id:16,
        descripcion:"sub-category xxx"
      }
    ]
  //  this.mainService.getAll()
  //                       .then(response => {
  //                         this.Table = response;
  //                         this.blockUI.stop();
  //                       }).catch(error => {

  //                         console.clear
  //                         this.blockUI.stop();
  //                         this.createError(error)
  //                       })

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

    create(success) {
          this._service.success('¡Éxito!', success);

    }
    createError(error) {
          this._service.error('¡Error!', error);

    }
  }

