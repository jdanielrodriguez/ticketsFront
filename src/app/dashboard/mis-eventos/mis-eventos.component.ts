import { Component, OnInit, Injectable } from '@angular/core';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbCarousel} from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Location } from '@angular/common';
import { EventosService } from "./../../home/_services/eventos.service";
import { EventosFuncionesService } from "./../../home/_services/eventos-funciones.service";
import { EventosFuncionesAreaLugarService } from "./../../home/_services/eventos-funciones-area-lugar.service";
import { EventosFuncionesAreaService } from "./../../home/_services/eventos-funciones-area.service";
import { EventosFuncionesImagenesService } from "./../../home/_services/eventos-funciones-imagenes.service";
import { path } from "../../config.module";

declare var $: any
declare const google: any;
@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class MisEventosComponent implements OnInit {
  localidades:any

  public isCollapsed = false;
  dataSearch = {
    idArea:'',
    idFuncion:''
  }
  private basePath:string = path.path
  cantidad = 0
  SelectedData:any = null;
  eventoId:any = null
  mainEvento =null;
  Table:any = null
  lugaresSelected = []
  @BlockUI() blockUI: NgBlockUI;
  positions:any
  lat:any=14.66430813990437
  lng:any=-90.51446914672852
  fechaInicio=new Date()
  fechaFin=new Date()
  constructor(
    private route: ActivatedRoute,
    private _service: NotificationsService,
    private location: Location,
    private mainService: EventosService,
    private secondService: EventosFuncionesService,
    private fiveService: EventosFuncionesImagenesService,
    private fourdService: EventosFuncionesAreaLugarService,
    private sixthService:EventosFuncionesAreaService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.cargarAll()
  }
  model1: Date;
  model2: Date;

  get today() {
    return new Date();
  }
  ocultarForm(){
    this.SelectedData = null;
    $('#formEditar').removeClass('show');
    $('#formIngresar').removeClass('show');
  }
  collapse(str:string,selectedEdit?){
    this.lugaresSelected.length=0
    if(selectedEdit){
      let lat = parseFloat(selectedEdit.latitud)
      let lng = parseFloat(selectedEdit.longitud)
      // let positions = new google.maps.LatLng(lat, lng);
      // selectedEdit.positions = positions
      this.SelectedData=selectedEdit
      this.select(selectedEdit)
    }
    if($('#'+str).collapse("show")){
      $('#'+str).collapse("hide")

    }else{
      $('#'+str).collapse("show")

    }
  }
  add(item){
    item.vendido=0
    this.lugaresSelected.push(item)
    item.vendido=1
  }
  select(funcion){
    this.blockUI.start();
    this.lugaresSelected.length=0
    this.secondService.getSingle(funcion.id)
                      .then(response => {
                        this.mainEvento = this.mainEvento?this.mainEvento:response.evento
                        funcion = response
                        funcion.usuario = localStorage.getItem('currentId');
                        funcion.latitud = this.lat;
                        funcion.longitud = this.lng;
                        funcion.evento=this.mainEvento
                        funcion.inicio = funcion.fecha_inicio+" "+funcion.hora_inicio
                        funcion.fin = funcion.fecha_fin+" "+funcion.hora_fin
                        funcion.fecha_inicio = new Date(funcion.fecha_inicio);
                        funcion.fecha_fin = new Date(funcion.fecha_fin);
                        this.SelectedData=funcion
                        console.log("Ultimo",this.SelectedData);
                        this.SelectedData.areas.forEach(area => {
                          area.lugares.forEach((lugar ,i)=> {
                            lugar.titulo = lugar.titulo+' '+(i+1);
                            lugar.vendido = +lugar.vendido;
                            lugar.selected = +lugar.vendido;
                          });
                        });
                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError(error)
                      })
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
    this.positions = event.latLng;
      let positions1 = event.latLng + '';
      let pos = positions1.replace(')','').replace('(','').split(',')
      this.lat = pos[0]
      this.lng = pos[1]
      event.target.panTo(this.positions);
      // console.log(this.lat+' @ '+this.lng+' @ '+event.latLng+'\n'+pos[0]);

  }
  addEvento(){
    $('#AgregarEventoModal').modal('show');
  }
  agregarLocalidad(selected:any,form){
    let area = {
      titulo: form.value.descripcionLocalidad,
      descripcion: form.value.descripcionLocalidad,
      precio: form.value.precioLocalidad,
      total: 0,
      vendidos: 0,
      type: 1,
      state: 1,
      tipo: null,
      evento_funcion:selected.id,
      lugares:[]
    }
    let areas = selected.areas
    areas.push(area);
    this.update(this.SelectedData)
    form.reset();

  }

  actualizarLocalidad(selected:any,form){
      this.blockUI.start()
    this.sixthService.update(selected)
                        .then(response=>{
                          selected=response
                          this.blockUI.stop()
                        })
                        .catch(error=>{
                          this.blockUI.stop()
                          console.log(error);
                        })
  }
  cargarAll(){
    this.blockUI.start();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = '1900';
    let stoday = yyyy + '-' + mm + '-' + dd;
    let data = {
      id:0,
      state:localStorage.getItem('currentId'),
      filter:'usuario'
    }

      this.mainService.getAllFilter(data)
                          .then(async response => {
                            await response.forEach(element => {
                              element.idtitulo = element.titulo.replace(/ /g,'_');
                            });
                            this.Table = response;
                            console.log(response);

                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }
  insertLugares(area,form?){
    let lugar = {
      titulo: "Silla ",
      descripcion: "prueba 2",
      lugar: (area.lugares.length*1)+1,
      numero: (area.lugares.length*1)+1,
      butaca: (area.lugares.length*1)+1,
      vendido: 0,
      type: 1,
      state: 1,
      evento_funcion_area: area.id,
      catidadLugares:area.catidadLugares
    };
    this.fourdService.create(lugar)
                      .then(response => {
                        form.reset()
                        this.blockUI.stop();
                        this.select(this.SelectedData)
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError(error)
                      })

  }
  insert(formData){
    let form = formData
    this.mainEvento = this.mainEvento?this.mainEvento:this.SelectedData.evento
    formData = formData.value
    this.blockUI.start();
    formData.usuario = localStorage.getItem('currentId');
    formData.latitud = this.lat;
    formData.longitud = this.lng;
    formData.evento=this.mainEvento
    formData.fecha_fin=formData.fecha_fin.toISOString().split("T")[0];
    formData.fecha_inicio=formData.fecha_inicio.toISOString().split("T")[0];
    formData.inicio = formData.fecha_inicio+" "+formData.hora_inicio
    formData.fin = formData.fecha_fin+" "+formData.hora_fin
    this.secondService.create(formData)
                      .then(response => {
                        form.reset()
                        this.blockUI.stop();
                        this.cargarAll()
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError(error)
                      })
  }
  insertarEvento(data:any){
    this.blockUI.start();
    data.usuario = localStorage.getItem('currentId');
    this.mainService.create(data)
                      .then(response => {
                        this.eventoId = response.id
                        $('#AgregarEventoModal').modal('hide');
                        this.blockUI.stop();
                        this.cargarAll()
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError(error)
                      })
  }
  guardarImg(){
    let data = {
      url: $('#imagenComentario').attr("src"),
      evento:this.SelectedData.id
    }
    $('#imagenComentario').attr("src","https://placehold.it/500X500?text=X");
    this.SelectedData.url = data.url;
    this.SelectedData.evento = data.evento;


    this.blockUI.start()
    this.fiveService.create(this.SelectedData)
                      .then(response=>{
                        this.blockUI.stop()
                        this.SelectedData.imagenes.push(response)
                        })
                        .catch(error=>{
                          this.blockUI.stop()
                        })

  }
  update(formValue){
    formValue = formValue?formValue.value?formValue.value:formValue:this.SelectedData
    this.mainEvento = this.mainEvento?this.mainEvento:this.SelectedData.evento
    formValue.fecha_fin=formValue.fecha_fin.toISOString().split("T")[0];
    formValue.fecha_inicio=formValue.fecha_inicio.toISOString().split("T")[0];
    formValue.latitud = this.lat;
    formValue.longitud = this.lng;
    formValue.id = this.SelectedData.id
    formValue.evento = this.mainEvento;
    formValue.inicio = formValue.fecha_inicio+" "+formValue.hora_inicio
    formValue.fin = formValue.fecha_fin+" "+formValue.hora_fin
    this.blockUI.start()
    this.secondService.update(formValue)
                      .then(response=>{
                        this.blockUI.stop()
                        this.select(response)
                      })
                      .catch(error=>{
                        this.blockUI.stop()
                        console.log(error);

                      })
  }
  subirImagenes(archivo,form,id){
    var archivos=archivo.srcElement.files;
    let url = `${this.basePath}/api/upload`
    var i=0;
    var size=archivos[i].size;
    var type=archivos[i].type;
        if(size<(5*(1024*1024))){
          if(type=="image/png" || type=="image/jpeg" || type=="image/jpg"){
        $("#"+id).upload(url,
            {
              avatar: archivos[i],
              carpeta: "Eventos"
          },
          function(respuesta)
          {
            $('#imagenComentario').attr("src",'')
            $('#imagenComentario').attr("src",respuesta.picture)
            $("#"+id).val('')
            $(".barra_de_progreso").val(0)
            $('#guardarImagenes').attr("disabled",false)
            $("#stopLoader").click();
          },
          function(progreso, valor)
          {
            $(".barra_de_progreso").val(valor);
          },
          function(error){
            console.log(error);

          }
        );
          }else{
            this.createError("El tipo de imagen no es valido")
          }
      }else{
        this.createError("La imagen es demaciado grande")
      }
  }
  eliminarLocalidad(id:string){
    this.blockUI.start();
    if(confirm("¿Desea eliminar el Tipo de Equipos?")){
    this.sixthService.delete(id)
                      .then(response => {
                        response.id = response.evento_funcion
                        this.select(response)
                        this.createSuccess('Localidad borrada exitosamente')
                        console.clear()

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
  deleteLugares(form){
    this.blockUI.start();
    let data = {
      aEliminar:this.lugaresSelected,
      evento_funcion_area:form.id
    }
    if(confirm("¿Desea eliminar el Tipo de Equipos?")){
    this.fourdService.delete(data)
                      .then(response => {
                        this.createSuccess('Localidad borrada exitosamente')
                        response.forEach(element => {
                          let index = form.lugares.findIndex(data => data.id==element.id)
                          if(index>0){
                            form.lugares.splice(index,1)
                          }
                        });
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
