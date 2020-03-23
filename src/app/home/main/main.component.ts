import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NavComponent } from "./../nav.component";
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { EventosFuncionesService } from "./../_services/eventos-funciones.service";
import { AppComponent } from "./../../app.component";
import {TranslateService} from '@ngx-translate/core';

declare var $: any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers:[NgbCarouselConfig]
})
export class MainComponent implements OnInit {
Table: any = null;
sliderInicio = 0;
public _id: number;
public search: any;
agregados: any[] = [];
selectedData: any;
@BlockUI() blockUI: NgBlockUI;
browserLang:any = this.parentComponent.browserLang;
Id:any = '';
slides:any =[]
//Servicio el cual se va a trabajar
constructor(
  private parentComponent: NavComponent,
  private _service: NotificationsService,
  private route: ActivatedRoute,
  private location: Location,
  private mainService: EventosFuncionesService,
  private router: Router,
  private app: AppComponent,
  public translate: TranslateService,
  private nav:NavComponent,
  private config: NgbCarouselConfig
    ) { }

//Llamar los metodos que se van a utilizar
ngOnInit() {
    this.config.interval = 3000;
    this.config.wrap = true;
    this.config.keyboard = true;
    this.config.pauseOnHover = false;
    this.blockUI.start();
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
  setTimeout(() => {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').removeClass('d-none');
    $('#inSeachForm').addClass('d-none');
    $('#logoTipo').removeClass('d-none');
    this.blockUI.stop();
  }, 500);
  this.translate.addLangs(['en', 'es']);
  this.translate.setDefaultLang('en');
  this.translate = this.app.translate;
  // console.log(this.app.translate);
  // console.log(this.translate);
  $(document).ready(data => {
      this.changeLang()
      this.cargarSlides();
      this.ngAfterViewInit()
      this.cargarTop();
  })
}
ngAfterViewInit() {
  // setTimeout(() => {
  //     this.parentComponent.searchContent = '';
  // });
}
changeLang(){
  this.translate.use(this.parentComponent.browserLang);
  this.translate.resetLang(this.parentComponent.browserLang)
}
navegar(url:string,id?:number){
  this.router.navigate([url])
  if(id && id>0){
    localStorage.setItem('idCategory',id+'');
  }
}
getFuciones(){
  this.blockUI.start();
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  let stoday = yyyy + '-' + mm + '-' + dd;
  let data = {
    id:stoday,
    state:'0',
    filter:'proximos'
  }
    this.mainService.getAllFilter(data)
                        .then(response => {
                          response.forEach(element => {
                            element.idtitulo = element.titulo.replace(/ /g,'_');
                          });
                          this.Table = response;
                          // console.log(response);

                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear
                          this.blockUI.stop();
                          this.createError(error)
                        })


  }
  cargarSlides(){
      this.blockUI.start();
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();
      let stoday = yyyy + '-' + mm + '-' + dd;
      let data = {
        id:stoday,
        state:'0',
        filter:'proximos-principales'
      }
      this.slides = []
      this.mainService.getAllFilter(data)
                          .then(response => {
                            response.forEach(element => {
                              element.imagenes.forEach(element2 => {
                                if(!this.slides.find(element1 => { return element1.id==element2.id})){
                                  this.slides.push(element2)
                                }
                              });
                            });
                            // this.slides = response;
                            // console.log(this.slides);
                            let ramdominicio=Math.round(Math.random() * (this.slides.length))
                            this.sliderInicio = this.slides.length<10?0:ramdominicio;
                            // console.clear()
                            this.getFuciones();
                            this.blockUI.stop();
                          }).catch(error => {

                            console.clear

                            this.blockUI.stop();
                            this.createError(error)
                          })

    }
  cargarTop(){
    // let datos = localStorage.getItem('carrito');
    // if(datos){
    //   this.agregados = JSON.parse(datos);
    // }
    // this.blockUI.start();
    // let data = {
    //   limit: 20,
    //   tipo: 2
    // }
    // this.secondService.getTop(data)
    //                 .then(response => {
    //                   response.forEach(element => {
    //                     if(this.agregados.find(data => {
    //                       return data.id == element.id
    //                     })){
    //                       element.compare = true;
    //                       element.ranking = 5;
    //                     }else{
    //                       element.compare = false;
    //                       element.ranking = 5;
    //                     }

    //                   });
    //                   this.Biss = response;
    //                   // console.log(response);

    //                   this.blockUI.stop();
    //                 }).catch(error => {

    //                   console.clear

    //                   this.blockUI.stop();
    //                   this.createError(error)
    //                 })
  }

  removeShoppingCar(data: any) {
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
    this.agregados.splice(this.agregados.findIndex(dat => {
      return dat.id == data.id
    }), 1)
    localStorage.setItem('carrito', JSON.stringify(this.agregados));
    this.nav.removeShoppingCar(data);

    this.create("Se eliminó el Bis de tu lista de comparacion");
  }

  addShoppingCar(data:any){
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
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

