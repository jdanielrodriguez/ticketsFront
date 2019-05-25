import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { CategorysService } from "./../_services/categorys.service";
import { NavComponent } from "./../nav.component";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;

declare var $: any

@Component({
  selector: 'app-become-seller',
  templateUrl: './become-seller.component.html',
  styleUrls: ['./become-seller.component.css']
})
export class BecomeSellerComponent implements OnInit {
  Table: any;
  public _id: number;
  public search: any;
  selectedData: any;
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  @BlockUI() blockUI: NgBlockUI;
  Id:any = localStorage.getItem('currentId');
  Biss:any = [
    {
      id:1,
      name:"Sellet/Company",
      description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
      range:3
    }
  ]
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
  cargarAll(){
    // this.blockUI.start();
    this.Biss = [
      {
        id:1,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:2,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:4
      },
      {
        id:3,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:2
      },
      {
        id:4,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:5
      },
      {
        id:5,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:1
      },
      {
        id:6,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:2
      },
      {
        id:7,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:8,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:9,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:10,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:11,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:12,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:13,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:14,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:15,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:16,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:17,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:18,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:19,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:20,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:21,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:22,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:23,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:24,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      }
    ]
    this.Table = [
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
      {
        id:1,
        descripcion:"hola mundo"
      },
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

