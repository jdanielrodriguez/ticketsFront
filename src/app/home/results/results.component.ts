import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from "./../nav.component";
import { BisService } from "./../_services/bis.service";
import { GlobalsService } from "./../_services/globals.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject, Observable } from 'rxjs';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {Subscription} from 'rxjs';

declare var $: any

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  Table: any = null;
  Parents: any;
  subscriptionResult:Subscription;
  subscriptionSearch:Subscription;
  @BlockUI() blockUI: NgBlockUI;
  private resultsSearch: Observable<any>;
  private resultsResult: Observable<any>;
  public _id: number;
  public searchValues:any;
  public search: any;
  selectedData: any;
  selectedType: any;
  Id:any = '';
  type:any = '';
  searchContent:any = '';
  url:string = '../../../';
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
    private mainService:BisService,
    private cdRef:ChangeDetectorRef,
    private nav:NavComponent
  ) { }
  escribe(){
    console.log(this.filters)
  }
  //Llamar los metodos que se van a utilizar
  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.cargarAll();
  }
  cargarAll(paramas?){
    this.blockUI.start();

    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
    this.getParams();
    let params = paramas?paramas:null;
    if(this.type=='All'){
      params = {
        search: this.searchContent,
        gt: this.filters.range.min,
        lt: this.filters.range.max,
      }
    }else{
      params = {
        tipo: this.getType(this.type),
        search: this.searchContent,
        gt: this.filters.range.min,
        lt: this.filters.range.max,
      }
    }
    this.mainService.getFind(params)
                        .then(response => {
                          response.forEach(element => {
                            if(this.agregados.find(data => {
                              return data.id == element.id
                            })){
                              element.compare = true;
                              element.ranking = 5;
                            }else{
                              element.compare = false;
                              element.ranking = 5;
                            }

                          });
                          this.Table = response;
                          this.GlobalsService.changeResults(response);
                          let dato = {
                            searchContent: this.searchContent,
                            type: this.type
                          }
                          this.GlobalsService.changeSearch(dato);
                          this.nav.changeValSerach()

                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear
                          this.blockUI.stop();
                          this.createError(error)
                        })
  }
  getSearch(id?){
    console.log('hola mundo');

  }

  getParams(){
      this.type=''
      this.searchContent=''
      this.type = this.route.snapshot.paramMap.get("type");
      this.searchContent = this.route.snapshot.paramMap.get("searchContent");
      let dato = {
        searchContent: this.searchContent,
        type: this.type
      }
      this.resultsSearch = this.GlobalsService.getSearch();
      this.subscriptionSearch = this.resultsSearch.subscribe(item => this.searchValues = item)
      this.GlobalsService.changeSearch(dato);
      this.resultsResult = this.GlobalsService.getResults();
      this.subscriptionResult = this.resultsResult.subscribe(item => this.Table = item)

      this.nav.changeValSerach()

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
  }
