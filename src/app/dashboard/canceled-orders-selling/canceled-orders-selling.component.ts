import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrdersService } from "./../../home/_services/orders.service";
import { GlobalsService } from "./../../home/_services/globals.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject, Observable } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

// // import 'rxjs/add/operator/switchMap';;
import {switchMap} from 'rxjs/operators';
import { OffersService } from '../../home/_services/offers.service';

declare var $: any
@Component({
  selector: 'app-canceled-orders-selling',
  templateUrl: './canceled-orders-selling.component.html',
  styles: []
})
export class CanceledOrdersSellingComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  title:string = "Canceled Orders"
  idCurrent = localStorage.getItem('currentId');
  Parents: any;
  @BlockUI() blockUI: NgBlockUI;
  public _id: number;
  public search: any;
  selectedData: any;
  selectedType: any;
  Id:any = '';
  id:any = '';
  searchContent:any = '';
  url:string = '../../..';
  searchFilters:boolean = false;
  agregados: any[] = [];
  Table:any = null
  constructor(
    private _service: NotificationsService,
    private CotizacionesService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.cargarAll();
  }

  getParams(){
    this.blockUI.start();
    try{
      this.id=''
      this.id = this.route.snapshot.paramMap.get("id");
      // this.route.params
      //           .switchMap((params: Params) => (params['id']))
      //           .subscribe(response => {
      //                             this.id+=response
      //                         });
    }catch(e){
        this.url = "../../..";


    }
  }

  cargarAll(){
    this.blockUI.start();
    // this.getParams()
    this.idCurrent = localStorage.getItem('currentId');
    this.CotizacionesService.getAllSellersCanceledOrders(this.idCurrent)
                        .then(response => {

                          this.Table = response;
                          // console.log('resultado busqueda',response);
                          console.log(this.Table);


                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear

                          this.blockUI.stop();
                          this.createError(error)
                        })


    }

    delete(id:string){
      this.blockUI.start();
      if(confirm("¿Do you want to deleted?")){
      this.CotizacionesService.delete(id)
                        .then(response => {
                          console.log(response);

                          this.cargarAll()
                          this.create('Request Deleted Success')

                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear()

                          this.blockUI.stop();
                          this.createError(error)
                        })
      }else{
                          console.clear

                          this.blockUI.stop();
      }

    }

    create(success) {
      this._service.success('¡Éxito!', success);

    }
    createError(error) {
          this._service.error('¡Error!', error);

    }
}
