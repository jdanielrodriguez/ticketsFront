import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaisMethodService } from "./../../_services/pais-method.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any
@Component({
  selector: 'app-choose-paid-method',
  templateUrl: './choose-paid-method.component.html',
  styleUrls: ['./choose-paid-method.component.css']
})
export class ChoosePaidMethodComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  Cardselected = 2
  @BlockUI() blockUI: NgBlockUI;
  bisCard = {
    numeroBisCard:'',
    usuarioId: localStorage.getItem('currentId')
  }
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
  }

  goBack(){
    this.location.back();
  }

  inserBisCard(){
    this.blockUI.start();
    this.PaisMethodService.active(this.bisCard)
                            .then( response => {
                              this.blockUI.stop();
                              this.createSuccess('Biscard Registed');
                              localStorage.setItem('currentTipoUsuarioId', '2');
                              // console.log(response);

                              this.router.navigate([`./../checkout/detail/biscard`,response.id])
                            }).catch( error => {
                              console.log(error);

                              this.blockUI.start();

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
