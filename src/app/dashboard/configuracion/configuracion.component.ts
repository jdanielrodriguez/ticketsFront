import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from "./../../home/_services/users.service";
import { AuthServices } from "./../../home/_services/auth.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { path } from "../../config.module";

declare var $: any
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  sesionNueva = localStorage.getItem('currentNuevaSesion');
  public isCollapsed = true;
  ranking=5;
  private basePath:string = path.path
  SelectedData:any = null;
  id:number = +localStorage.getItem('currentId');
  selected={
    GovermentID:false,
    ComercialPatent:false,
    EmailAddress:false,
    PhoneNumber:false,
    BussinessAddress:false
  };
  mainData = {
    password:'',
    username:localStorage.getItem('currentEmail'),
    id:+localStorage.getItem('currentId'),
    type:'changepass'
  }
  @BlockUI() blockUI: NgBlockUI;
  rowsItems:any=[
    {id:1}
  ]
  agregar(){
    let id = ((this.rowsItems[this.rowsItems.length-1].id)*1)+1
    this.rowsItems.push({id:id})
  }
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private AuthService: AuthServices,
    private UsersService:UsersService,
    ) { }

    changePass(formValue:any){
      // console.log(this.mainData.hash);
      formValue.id=+localStorage.getItem('currentId')
      this.blockUI.start()
      this.AuthService.updatePass(formValue)
                      .then( response => {
                        // console.log(response);
                        this.cargarOne();
                        this.createSuccess('Su Clave fue Cambiada')
                        $('#ActualizaPass').modal('hide');
                        this.blockUI.stop()
                      })
                      .catch( error => {
                        this.createError(error)
                        this.blockUI.stop()
                      })
    }
  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    // this.blockUI.reset();
    this.cargarOne();
  }

  cargarOne(){
    // this.blockUI.reset();

    this.id = +localStorage.getItem('currentId');
    // this.blockUI.start();
    this.SelectedData = null;
    this.UsersService.getSingle(this.id)
                    .then(response => {
                      this.SelectedData = response;
                      this.SelectedData.apellido = ((this.SelectedData.primerApellido)?this.SelectedData.primerApellido:'')+' '+((this.SelectedData.segundoApellido)?this.SelectedData.segundoApellido:'')
                      this.SelectedData.nombre = ((this.SelectedData.primerNombre)?this.SelectedData.primerNombre:'')+' '+((this.SelectedData.segundoNombre)?this.SelectedData.segundoNombre:'')
                      // console.log(response);
                      this.selected.GovermentID = response.verificacion?response.verificacion.indexOf("G"):false;
                      this.selected.ComercialPatent = response.verificacion?response.verificacion.indexOf("C"):false;
                      this.selected.EmailAddress = response.verificacion?response.verificacion.indexOf("E"):false;
                      this.selected.PhoneNumber = response.verificacion?response.verificacion.indexOf("P"):false;
                      this.selected.BussinessAddress = response.verificacion?response.verificacion.indexOf("B"):false;
                      if(response.state=='21'){
                        $('#ActualizaPass').modal('show');
                      }
                      console.log(this.SelectedData);

                      this.blockUI.stop();
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop();
                      this.createError(error)
                    })
  }

  update(formValue:any){
    this.blockUI.start();
    setTimeout(() => {

        this.blockUI.stop();
    }, 1000);
    formValue.id = localStorage.getItem('currentId');
    let nombres = formValue.nombres.split(' ')
    let apellidos = formValue.apellidos.split(' ')
    this.SelectedData.primerNombre = nombres[0] ;
    this.SelectedData.segundoNombre = nombres[1] ;
    this.SelectedData.foto = $('.img-profile').attr("src") ;
    this.SelectedData.primerApellido = apellidos[0] ;
    this.SelectedData.segundoApellido = apellidos[1] ;
    this.SelectedData.descripcion = formValue.descripcion ;
    this.SelectedData.id = formValue.id ;
    formValue=this.SelectedData;
    this.UsersService.update(formValue)
                      .then(response => {
                        this.createSuccess('Profile Saved')
                        this.SelectedData = response
                        console.clear


                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })


  }

  subirImagenes(archivo,form,id){
    this.blockUI.start();
    var archivos=archivo.srcElement.files;
    let url = `${this.basePath}/api/upload`

    var i=0;
    var size=archivos[i].size;
    var type=archivos[i].type;
        if(size<(2*(1024*1024))){
          if(type=="image/png" || type=="image/jpeg" || type=="image/jpg"){
        $("#"+id).upload(url,
            {
              avatar: archivos[i],
              carpeta: "perfil/"+localStorage.getItem('currentId')
          },
          function(respuesta)
          {
            $('.img-profile').attr("src",'')
            $('.img-profile').attr("src",respuesta.picture)
            $("#"+id).val('')
            $("#barra_de_progreso").val(0)
            $("#stopLoader").click();

          },
          function(progreso, valor)
          {

            $("#barra_de_progreso").val(valor);
          }
        );
          }else{
            this.createError("El tipo de imagen no es valido")
            this.blockUI.stop();
          }
      }else{
        this.createError("La imagen es demaciado grande")
        this.blockUI.stop();
      }
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

  createSuccess(success) {
        this._service.success('¡Éxito!', success);

  }
  createError(error) {
        this._service.error('¡Error!', error);

  }
   // lineChart
   public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Delivered'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Completed'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'New Products'},
    {data: [90, 48, 57, 9, 10, 27, 40], label: 'New Orders'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
