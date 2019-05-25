import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from "./../nav.component";
import { BisService } from "./../_services/bis.service";
import { GlobalsService } from "./../_services/globals.service";
import { SubCategorysService } from "./../_services/sub-categorys.service";
import { CategorysService } from "./../_services/categorys.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject, Observable } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import {Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators'
// // import 'rxjs/add/operator/switchMap';;

declare var $: any

@Component({
  selector: 'app-result-cat',
  templateUrl: './result-cat.component.html',
  styleUrls: ['./result-cat.component.css']
})
export class ResultCatComponent implements OnInit {
  Table: any = null;
  Parents: any;
  categorys:any
  subscription:Subscription;
  id:any = localStorage.getItem('currentId');
  @BlockUI() blockUI: NgBlockUI;
  private results: Observable<any>;
  private results2: Observable<any>;
  public _id: number;
  Loading1 = false;
  public search: any;
  selectedData: any;
  selectedType: any;
  myCat: any;
  subcate: number = 0;
  Id:any = '';
  type:any = '';
  searchContent:any = '';
  url:string = '../../';
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
    private CategorysService:CategorysService,
    private SubCategorysService:SubCategorysService,
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
    this.searchContent=localStorage.getItem('idCategory')
    this.cargarAll();
    this.cargarOne();
  }

  addIdCat(id:number){
    if(id && id>0){
      localStorage.setItem('idCategory',id+'');
      this.searchContent = id;
    }
  }
  cargarOne(){
    this.blockUI.start();
    this.myCat = null;
    this.CategorysService.getSingle(this.searchContent)
                    .then(response => {
                      this.myCat = response;
                      this.cargarSubCate(response.id)
                      // console.log(response);
                      this.blockUI.stop();
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop();
                      this.createError(error)
                    })
  }

  cargarSubCate(id){
    this.blockUI.start();
    this.categorys = null;
    this.CategorysService.getAllMine(id)
                    .then(response => {
                      this.categorys = response;
                      // console.log(response);
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
    try{
      this.type=''

      if(this.searchContent==''){
        this.searchContent=''
        this.searchContent = this.route.snapshot.paramMap.get("searchContent");

      }
      if(this.myCat==''){
        this.myCat='';
        this.myCat = this.route.snapshot.paramMap.get("category");
      }

      if(this.searchContent!=""){

        let params = null
        if(this.subcate){
          params = {
            category: this.searchContent,
            subcategory: this.subcate
          }
        }else{
          params = {
            category: this.searchContent
          }
        }
      }
    }
    catch(e){
      this.url = '../../'
        let params = {
          gt: this.filters.range.min,
          lt: this.filters.range.max,
        }
        // console.log(params);

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
  cargarAll(){
    this.blockUI.start();
    this.getParams()
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
    let params = null
    if(this.subcate){
      params = {
        category: this.searchContent,
        subcategory: this.subcate
      }
    }else{
      params = {
        category: this.searchContent
      }
    }

    // console.log(params);

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
                          // console.log('resultado busqueda',response);
                          // console.log(this.Table);
                          this.blockUI.stop();

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
  }
