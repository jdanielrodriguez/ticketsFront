import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from "./../nav.component";
import { ProjectsService } from "./../_services/projects.service";
import { BisService } from "./../_services/bis.service";
import { OffersService } from "./../_services/offers.service";
import { OrdersService } from "./../_services/orders.service";
import { GlobalsService } from "./../_services/globals.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject, Observable } from 'rxjs';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {Subscription} from 'rxjs';
import { switchMap } from 'rxjs/operators';
// // import 'rxjs/add/operator/switchMap';;

declare var $: any

interface Cotizacion {
  id?: number,
  Descripcion?: string,
  descripcion: string,
  tiempo: number,
  costo: number,
  estado: boolean,
  creadorId?:number,
  licitacionId?:number,
  proformaId?:number,
  bisId?:string,
  Bis?:string,
  createdAt?:any,
  updatedAt?:any,
  solicitanteId?:number,
  CotizacionItems?:any
}
@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent implements OnInit {
  Table: any = null;
  Parents: any;
  rowsItems:any=[
    {continuidad:1,descripcion:"",costo:0,tiempo:0},
    {continuidad:2,descripcion:"",costo:0,tiempo:0},
    {continuidad:3,descripcion:"",costo:0,tiempo:0}
  ]
  subscription:Subscription;
  proforma:Cotizacion = {
    descripcion:'',
    tiempo: 0,
    costo: 0,
    Bis: null,
    estado: true
  };
  @BlockUI() blockUI: NgBlockUI;
  private results: Observable<any>;
  private results2: Observable<any>;
  public _id: number;
  public search: any;
  id:number = +localStorage.getItem('currentId');
  selectedData: any;
  selectedType: any;
  Id:any = '';
  solicitanteId:any = '';
  thisId:any = '';
  thistype:any = '';
  searchContent:any = '';
  url:string = '../../../../';
  searchFilters:boolean = false;
  agregados: any[] = [];
  filters:any = {
    range:{
      min : 0,
      max: 80000
    },
    ranking:5,
    level:[
      {
        id:1
      },
      {
        id:3
      }
    ],
    location:[
      {
        id:1
      },
      {
        id:3
      }
    ]

  }

  //Servicio el cual se va a trabajar
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private GlobalsService:GlobalsService,
    private mainService:ProjectsService,
    private secondService:OffersService,
    private nav:NavComponent,
    private OrdersService:OrdersService,
    private BisService: BisService
  ) { }
  escribe(){
    console.log(this.filters)
  }
  //Llamar los metodos que se van a utilizar
  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    $('html, body').animate({scrollTop:0}, '300');

    this.cargarSingle();
  }
  getSearch(id?){
    console.log('hola mundo');

  }
  getParams(){
    try{
      this.thisId=''
      this.thistype=''
      this.thisId = this.route.snapshot.paramMap.get("id");
      this.thistype = this.route.snapshot.paramMap.get("type");
      this.id = +localStorage.getItem('currentId');

    }
    catch(e){
      this.url = '../../'

    }
  }
  filtrosOn(){
    if(this.searchFilters){
      $('#serchFilters').addClass('mini-show')
    }else{
      $('#serchFilters').removeClass('mini-show')
    }
    this.searchFilters = !this.searchFilters

  }
  setType(data){
    this.selectedType=data.id
  }
  cargarSingle(){
    this.blockUI.start();
    this.getParams()
    let data = {
      id:(this.thistype!='project')?this.thisId.split(':')[1]:this.thisId,
      creadorId: this.id,
      proformaId: (this.thistype!='project')?this.thisId.split(':')[0]:this.thisId,
    }

    if(this.thistype){
      switch(this.thistype){
        case 'project':{
          let data = {
            id:this.thisId,
            creadorId: this.id,
            proformaId: this.thisId,
          }
            this.mainService.getSingleLicitacion(data)
                              .then(response => {
                                console.log(response);
                                this.selectedData = response[0];
                                if(this.selectedData.Cotizacion && this.selectedData.Cotizacion.length>0){
                                  this.proforma = this.selectedData.Cotizacion[0];
                                }
                                // this.proforma.CotizacionItems = this.rowsItems
                                this.rowsItems = this.proforma.CotizacionItems

                                if(this.rowsItems.length<=0){
                                  this.rowsItems.push({continuidad:1,descripcion:"",costo:0,tiempo:0});
                                }else{
                                  let data = 1;
                                  this.rowsItems.forEach(element => {
                                    element.continuidad = data;
                                    data++;
                                  });
                                }

                                this.blockUI.stop();

                              }).catch(error => {
                                console.clear
                                this.blockUI.stop();

                                this.createError(error)
                              })
          break;
        }
        case 'projects':{
          let data = {
            id:this.thisId.split(':')[0],
            creadorId: this.id,
            proformaId: this.thisId.split(':')[1],
          }
            this.mainService.getSingleMineLicitacion(data)
                              .then(response => {
                                this.selectedData = response[0];
                                if(this.selectedData.Cotizacion && this.selectedData.Cotizacion.length>0){
                                  this.proforma = this.selectedData.Cotizacion[0];
                                }
                                this.rowsItems = this.proforma.CotizacionItems

                                if(this.rowsItems.length<=0){
                                  this.rowsItems.push({continuidad:1,descripcion:"",costo:0,tiempo:0});
                                }else{
                                  let data = 1;
                                  this.rowsItems.forEach(element => {
                                    element.continuidad = data;
                                    data++;
                                  });
                                }

                                this.blockUI.stop();

                              }).catch(error => {
                                console.clear
                                this.blockUI.stop();

                                this.createError(error)
                              })
          break;
        }
        case 'bis':{
            this.BisService.getSingleBis(data)
                              .then(response => {
                                // console.log(response);
                                this.selectedData = response.Bis;
                                this.proforma = response.Cotizacion?response.Cotizacion[0]:null;
                                this.solicitanteId = response.solicitanteId;
                                // this.proforma.CotizacionItems = this.rowsItems
                                this.rowsItems = this.proforma.CotizacionItems

                                if(this.rowsItems.length<=0){
                                  this.rowsItems.push({continuidad:1,descripcion:"",costo:0,tiempo:0});
                                }else{
                                  let data = 1;
                                  this.rowsItems.forEach(element => {
                                    element.continuidad = data;
                                    data++;
                                  });
                                }
                                this.blockUI.stop();

                              }).catch(error => {
                                console.clear
                                this.blockUI.stop();

                                this.createError(error)
                              })
          break;
        }
        case 'request':{
            this.BisService.getSingleRequest(data)
                              .then(response => {
                                console.log(response);

                                this.proforma = response;
                                if(this.proforma.Bis){
                                  this.selectedData = this.proforma.Bis;
                                }
                                this.rowsItems = this.proforma.CotizacionItems

                                if(this.rowsItems.length<=0){
                                  this.rowsItems.push({continuidad:1,descripcion:"",costo:0,tiempo:0});
                                }else{
                                  let data = 1;
                                  this.rowsItems.forEach(element => {
                                    element.continuidad = data;
                                    data++;
                                  });
                                }
                                this.blockUI.stop();
                              }).catch(error => {
                                console.clear
                                this.blockUI.stop();

                                this.createError(error)
                              })
          break;
        }
      }
    }else{
      console.log('error');

    }



    }


  insert(){
    this.blockUI.start();
    this.getParams()
    this.proforma.creadorId = +this.id
    this.proforma.licitacionId = this.thistype!='project'?null:+this.thisId
    this.proforma.bisId = this.thistype=='project'?null:(this.thisId.split(':')[1])
    this.proforma.proformaId = this.thistype=='project'?null:(this.thisId.split(':')[0])
    this.proforma.descripcion = this.proforma.descripcion+""
    this.proforma.Descripcion = this.proforma.descripcion
    this.proforma.CotizacionItems = this.rowsItems
    this.proforma.solicitanteId = this.selectedData.solicitanteId
      // console.log(this.proforma)
    if(this.proforma.descripcion!='' && this.proforma.costo>0 && this.proforma.tiempo>0)
    {
    // this.blockUI.stop();
    this.secondService.create(this.proforma)
                        .then(response => {
                          $('html, body').animate({scrollTop:0}, '300');
                          this.blockUI.stop();
                          this.cargarSingle();

                        }).catch(error => {
                          console.clear

                          this.blockUI.stop();
                          this.createError(error)
                        })


    }else{
      this.createError('You have to complete all the items')
    }



    }

    update(){
      this.blockUI.start();
      this.getParams()
      this.proforma.creadorId = +this.id
      this.proforma.licitacionId = this.thistype!='project'?null:+this.thisId
      this.proforma.bisId = this.thistype=='project'?null:(this.thisId.split(':')[1])
      this.proforma.proformaId = this.thistype=='project'?null:(this.thisId.split(':')[0])
      this.proforma.descripcion = this.proforma.descripcion+""
      this.proforma.Descripcion = this.proforma.descripcion
      this.proforma.CotizacionItems = this.rowsItems
      this.proforma.solicitanteId = this.proforma.solicitanteId?this.proforma.solicitanteId:this.selectedData.creadorId
        console.log(this.proforma)
      if(this.proforma.descripcion!='' && this.proforma.costo>0 && this.proforma.tiempo>0)
      {
      // this.blockUI.stop();
      this.secondService.update(this.proforma)
                          .then(response => {
                            $('html, body').animate({scrollTop:0}, '300');
                            this.blockUI.stop();
                            console.log(response);

                            // this.cargarSingle();

                          }).catch(error => {
                            console.clear

                            this.blockUI.stop();
                            this.createError(error)
                          })


      }else{
        this.createError('You have to complete all the items')
      }



      }


    acceptOffer(){
      let data = {
        description: 'Created Order '+this.proforma.createdAt.split('T')[0],
        razonCancela: '',
        cancelada: false,
        finalizada: false,
        fechaEntrega: this.proforma.updatedAt.split('T')[0],
        cotizacionId: this.proforma.id,
        proformaId: this.proforma.proformaId,
        estado: true
      }
      this.OrdersService.create(data)
                        .then(response => {
                          $('html, body').animate({scrollTop:0}, '300');
                          this.blockUI.stop();
                          console.log(response);
                          this.router.navigate([`./../../dashboard/buying/my-requests`])

                        }).catch(error => {
                          console.clear

                          this.blockUI.stop();
                          this.createError(error)
                        })
    }

    removeShoppingCar(data: any) {
      this.agregados.splice(this.agregados.findIndex(dat => {
        return dat.id == data.id
      }), 1)
      localStorage.setItem('carrito', JSON.stringify(this.agregados));
      this.nav.removeShoppingCar(data);

      this.create("Se eliminó el Bis de tu lista de comparacion");
    }
    getType(type:string){
      switch(type){
        case 'Services':{
          return 1;
        }
        case 'Products':{
          return 2;
        }
        case 'Supliers':{
          return 3;
        }
        default:{
          return 0;
        }
      }
    }
    addShoppingCar(data:any){

      this.agregados.push(data);
      this.nav.addShoppingCar(data);
      localStorage.setItem('carrito', JSON.stringify(this.agregados));
      // console.log(this.agregados);

          this.create("Listo para Comparar")
      //console.log(this.agregados.length);
      //location.reload();
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

  agregar(){
    let id = ((this.rowsItems[this.rowsItems.length-1].continuidad)*1)+1
    this.rowsItems.push({continuidad:id,descripcion:"",costo:0,tiempo:0})
  }

  agregar2(){
    if(this.proforma.CotizacionItems){
      let id = ((this.proforma.CotizacionItems[this.proforma.CotizacionItems.length-1].id)*1)+1
      this.proforma.CotizacionItems.push({id:id,continuidad:id,descripcion:"",costo:0,tiempo:0})
    }
  }
  sumarDato(data:any){
    let tiempo = 0
    let costo = 0
    console.log(this.rowsItems);

    this.rowsItems.forEach(element => {

      element.costo = +$('#costDetail'+element.continuidad).val()
      element.tiempo = +$('#timeDetail'+element.continuidad).val()
      element.descripcion = $('#descripcionDetail'+element.continuidad).val()
      costo += +$('#costDetail'+element.continuidad).val()
      tiempo += +$('#timeDetail'+element.continuidad).val()
    });
    this.proforma.costo = costo;
    this.proforma.tiempo = tiempo;
    // console.log(this.proforma);
    if(typeof(data.key) != 'number' ){
      return false;
    }
  }
}
