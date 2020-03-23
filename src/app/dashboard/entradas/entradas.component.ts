import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Location } from '@angular/common';
import { EventosVentasService } from "./../../home/_services/eventos-ventas.service";
declare var $: any
@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {
  localidades:any
  dataSearch = {
    idArea:'',
    idFuncion:''
  }
  cantidad = 0
  SelectedData:any = null
  Table:any = null
  @BlockUI() blockUI: NgBlockUI;
  positions = []
  constructor(
    private route: ActivatedRoute,
    private _service: NotificationsService,
    private location: Location,
    private mainService: EventosVentasService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarAll()
  }
  ocultarForm(){
    this.SelectedData = null;
    $('#formEditar').removeClass('show');
  }
  collapse(str:string,selectedEdit?){
    if(selectedEdit){
      this.SelectedData=selectedEdit
    }
    if($('#'+str).collapse("show")){
      $('#'+str).collapse("hide")

    }else{
      $('#'+str).collapse("show")
    }
  }

  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array
  }
  onIdle(event) {
    console.log('map', event.target);
  }
  onMarkerInit(marker) {
    console.log('marker', marker);
  }
  onMapClick(event) {
    this.positions.push(event.latLng);
    event.target.panTo(event.latLng);
  }
  cargarAll(){
    this.blockUI.start();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let yyyy = "1900";
    let yyyy = today.getFullYear();
    let stoday = yyyy + '-' + mm + '-' + dd;
    let data = {
      state:stoday,
      id:localStorage.getItem('currentId'),
      filter:'usuario'
    }
      this.mainService.getAllFilter(data)
                          .then(response => {
                            response.forEach(element => {
                              element.funciones.forEach(SelectedData => {
                                SelectedData.areas.forEach(area => {
                                  area.lugares.forEach((lugar ,i)=> {
                                    lugar.titulo = lugar.titulo+' '+(lugar.lugar);
                                    lugar.vendido = +lugar.vendido;
                                    lugar.selected = +lugar.vendido;
                                  });
                                });
                              });
                            });
                            this.Table = response;
                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }
  insert(data){

  }
  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: false,
    animate: "scale",
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
