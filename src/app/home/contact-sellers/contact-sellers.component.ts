import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from "./../nav.component";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { NotificationsService } from 'angular2-notifications';
import { CotizacionesService } from "./../_services/cotizaciones.service";
import { BisService } from "./../_services/bis.service";
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;
import { switchMap } from 'rxjs/operators'
interface proforma {
  descripcion: string,
  telefono: string,
  id?: string,
  email: string,
  precioTotal?: number,
  subTotal?: number,
  creadorId: number,
  Usuario?:any,
  solicitanteId?:number,
  bisIds?:any,
  cotizacionId: number,
  bisId: string
}
declare var $: any
@Component({
  selector: 'app-contact-sellers',
  templateUrl: './contact-sellers.component.html',
  styleUrls: ['./contact-sellers.component.css']
})
export class ContactSellersComponent implements OnInit {
  Table: any;
  faqs: any;
  Comments: any;
  public _id: number;
  public search: any;
  agregados: any[] = [];
  agregadosSelected: any[] = [];
  selectedData: proforma = {
    descripcion: '',
    telefono: '',
    email: '',
    creadorId: null,
    solicitanteId: null,
    cotizacionId: null,
    Usuario: null,
    bisId: null
  };
  Id:any = '';
  ranking=5;
  bisIds:any = [];
  phone11:string = null;
  email11:string = null;
  nombre11:string = null;
  apellido11:string = null;
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private nav:NavComponent,
    private BisService:BisService,
    private mainService: CotizacionesService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    let datos = localStorage.getItem('carritoSelected');
    if(datos){
      this.agregadosSelected = JSON.parse(datos);
    }
    console.log(this.agregadosSelected);

    this.phone11 = localStorage.getItem('currentTelefono')!='undefined'?localStorage.getItem('currentTelefono'):'';
    this.email11 = localStorage.getItem('currentEmail')!='undefined'?localStorage.getItem('currentEmail'):'';
    // console.log(this.email11)
    let idTemp = '';
    if(this.route.params){
      this.route.params.pipe(
        switchMap( (params:Params) => idTemp += params['id'])
      )
      // this.route.params
      //             .switchMap((params: Params) => (params['id']))
      //             .subscribe(response => {
      //                               idTemp+=response
      //                           });
          // this.selectedData.bisId = idTemp
          // this.selectedData.creadorId = +localStorage.getItem('currentId');
          this.bisIds = idTemp.split(':');
          this.selectedData.solicitanteId = +localStorage.getItem('currentId');
          // this.getOne(idTemp)
          // this.getFaqs(idTemp)

    }
  }
  getOne(id){
    this.blockUI.start();
    let data = {
      solicitanteId:+localStorage.getItem('currentId'),
      id:id.split(":")[0],
      ids:id.split(":")
    }
    let thisId = localStorage.getItem('currentId');

    this.BisService.getSingleMine(data)
                      .then(response => {
                        // console.log(data);

                        // console.log(response);
                        this.selectedData.Usuario = response.Usuario
                        if(response.Proforma && response.Proforma.length>0){
                          this.selectedData = response.Proforma[0]
                          this.phone11 = this.selectedData.telefono
                          this.email11 = this.selectedData.email
                        }else{
                          this.selectedData.bisId = response.id
                          this.selectedData.solicitanteId = +localStorage.getItem('currentId');
                          this.selectedData.creadorId = response.usuarioId;
                        }




                        this.blockUI.stop();
                        if(response.Usuario.id == thisId){
                          this.router.navigate([`./../../..`])
                        }
                      }).catch(error => {
                        if(error.status == '404'){

                          this.createError("Detalle no encontrado")

                        }
                        console.clear
                        this.blockUI.stop();
                        this.createError("Error With Bis")
                      })
  }
  insert(data){
    this.blockUI.start();
    let thisId = localStorage.getItem('currentId');
    this.selectedData.telefono = this.phone11
    this.selectedData.email = this.email11
    this.selectedData.solicitanteId = +thisId;
    this.bisIds.pop();
    this.selectedData.bisIds = this.bisIds;
    console.log(this.selectedData);

    if(this.selectedData.id){
      this.mainService.update(this.selectedData)
                      .then(response => {
                        setTimeout(() => {
                          this.create("Your request was Sended")
                          this.blockUI.stop();
                          this.router.navigate([`./../../../dashboard/buying/my-requests`])
                        }, 300);
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError("Error With Bis")
                      })
    }else{
      this.mainService.creates(this.selectedData)
                      .then(response => {
                          this.create("Your request was Sended")
                        setTimeout(() => {
                          this.blockUI.stop();
                          localStorage.removeItem('carritoSelected');
                          localStorage.removeItem('carrito');
                          this.router.navigate([`./../../../dashboard/buying/my-requests`])
                        }, 300);
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError("Error With Bis")
                      })
    }

  }
  goBack(){
    this.location.back();
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
