import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaisMethodService } from "./../../_services/pais-method.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// // import 'rxjs/add/operator/switchMap';;
import { switchMap } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any
@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.css']
})
export class CheckoutDetailComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  @BlockUI() blockUI: NgBlockUI;
  subtotal = '0.00'
  total = '0.00'
  Cardselected = 2
  bisCard = null
  detailShow = null
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private PaisMethodService: PaisMethodService,
    private router: Router
  ) { }

  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');

    let type = '';
    let idTemp = '';
    if(this.route.params){
      this.route.params.pipe(
        switchMap( (params:Params) => type+= params['type'])
      )

      this.route.params.pipe(
        switchMap( (params:Params) => idTemp+= params['id'])
      )
      // this.route.params
      //             .switchMap((params: Params) => (params['type']))
      //             .subscribe(response => {
      //                               type+=response
      //                           });
      // this.route.params
      //             .switchMap((params: Params) => (params['id']))
      //             .subscribe(response => {
      //                               idTemp+=response
      //                           });

      if(type){
        switch (type) {
          case 'biscard':{
            this.getOneBiscard(idTemp)
            break;
          }
          default:{
            break;
          }
        }
      }

    }
  }

  goBack(){
    this.location.back();
  }

  getOneBiscard(id){
    this.blockUI.start();
    let data = {
      creadorId:+localStorage.getItem('currentId'),
      id:id
    }
    this.PaisMethodService.getSingle(id)
                      .then(response => {
                        this.bisCard = response
                        // console.log(response);

                        this.blockUI.stop();
                      }).catch(error => {
                        if(error.status == '404'){

                          this.createError("Detalle no encontrado")

                        }
                        console.clear
                        this.blockUI.stop();
                        this.createError("Error With Bis")
                      })
  }

  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: false,
    animate: "fromLeft",
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
