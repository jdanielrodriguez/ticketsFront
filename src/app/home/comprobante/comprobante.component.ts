import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Location } from '@angular/common';
import { EventosFuncionesAreaService } from "./../_services/eventos-funciones-area.service";
import { EventosVentasService } from "./../_services/eventos-ventas.service";
declare var $: any

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css']
})
export class ComprobanteComponent implements OnInit {
  dataSearch = {
    token:'',
    ern:''
  }

  comprobante = {
    token:'',
    aprobacion:'',
    ern:''
  }
  nombres = localStorage.getItem('currentNombres');
  apellidos = localStorage.getItem('currentApellidos');
  email = localStorage.getItem('currentEmail');
  SelectedData:any = null
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private route: ActivatedRoute,
    private _service: NotificationsService,
    private location: Location,
    private paidService: EventosVentasService,
    private mainService: EventosFuncionesAreaService,
    private router: Router,
  ) { }

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    this.getParams();
  }

  getParams(){
    this.dataSearch.token = this.route.snapshot.paramMap.get("token");
    this.dataSearch.ern = this.route.snapshot.paramMap.get("ern");
    this.cargarComprobante(this.dataSearch)
  }

  cargarComprobante(dato:any){
    let datos = localStorage.getItem('selectedSillas');
    if (datos) {
      this.SelectedData = JSON.parse(datos);
      // localStorage.removeItem('selectedSillas');

    }
    if(dato.token.length<5){
      this.router.navigate(['./../../../../checkout/'+this.SelectedData.id+':'+(this.SelectedData.eventos.titulo.replace(/ /g,'_'))+':0'])
    }

    this.blockUI.start();
    let data = {
      token:dato.token,
      ern:dato.ern
    }

      this.paidService.comprobante(data)
                          .then(response => {
                            console.log(this.SelectedData);
                            console.log(response);
                            this.comprobante = response;
                            // this.enviarEmail();
                            // this.insert();
                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }
  insert(){
      localStorage.removeItem('selectedSillas');
      this.blockUI.start();
      let data = {
        cantidad: this.SelectedData.lugares.length,
        precio: this.SelectedData.precio,
        descripcion: 'Compra de boleto '+this.SelectedData.descripcion,
        url: "comewme.com",
        titulo : 'titulo',
        lugar : 'lugar',
        codigo : 'codigo',
        total : 'total',
        latitud : 'latitud',
        longitud : 'longitud',
        type : 'type',
        state : 'state',
        usuario : 'usuario',
        evento : 'evento',
        evento_funcion : 'evento_funcion',
        evento_funcion_area_lugar : 'evento_funcion_area_lugar',
        evento_vendedor : 'evento_vendedor',
        evento_descuento : 'evento_descuento'
      }
      this.paidService.pagar(data)
                          .then(response => {

                            console.log(response);
                            window.open(response.token,'_blank');
                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })

  }
  enviarEmail(){
    this.blockUI.start();
    let data = {
      nombres:this.nombres,
      apellidos:this.apellidos,
      email:this.email,
      SelectedData:this.SelectedData,
      comprobante:this.comprobante
    }
    this.paidService.enviar(data)
                  .then(response => {
                    this.createSuccess("Su comprobante ha sido enviado");
                    this.blockUI.stop();
                  }).catch(error => {
                    console.clear
                    this.blockUI.stop();
                    this.createError(error)
                  })
  }

  add(){
    let seleccionados = []
    this.SelectedData.lugares.forEach(element => {
      if(element.selected){
        seleccionados.push(element)
      }
    });
    if(seleccionados.length>0){
      this.SelectedData.totalAll = this.SelectedData.precio*(seleccionados.length)

    }
  }
  goBack(){
    this.location.back();
  }
  buscarSingle(search:any){
    this.blockUI.start();
    let data = {
      id:search.titulo.replace(/_/g,' '),
      state:search.fecha,
      filter:'buscar'
    }
      this.mainService.getAllFilter(data)
                          .then(response => {
                            this.blockUI.stop();
                            this.cargarFunciones(response.evento);
                            this.cargarAreas(response.id);
                            // this.cargarSingle(response.id);
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }

  cargarAreas(id:number){
    this.blockUI.start();
    let data = {
      id:0,
      state:id,
      filter:'evento_funcion'
    }
      this.mainService.getAllFilter(data)
                          .then(response => {
                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }

  cargarFunciones(id:number){
    this.blockUI.start();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, '0');
    let MM = String(today.getMinutes()).padStart(2, '0'); //January is 0!
    let ss = String(today.getSeconds()).padStart(2, '0'); //January is 0!
    let stoday = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss;
    let data = {
      id:id,
      state:stoday,
      filter:'proximos_eventos'
    }
      this.mainService.getAllFilter(data)
                          .then(response => {
                            console.log(response);

                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }
  navegar(url:string,id?:number){
    localStorage.removeItem('lastLinkUrl')
    if (!localStorage.getItem('currentUser')) {
      localStorage.setItem('lastLinkUrl',url);
      $('#loginTemplate').removeClass('container');
      $('#generalModalDetalle').modal("show");
    }else{
      this.router.navigate([url])
    }
  }
  collapse(str:string){
    if($('#'+str).collapse("show")){
      $('#'+str).collapse("hide")

    }else{
      $('#'+str).collapse("show")

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
