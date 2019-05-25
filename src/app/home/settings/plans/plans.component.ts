import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MembresiasService } from "./../../_services/membresias.service";
import { NotificationsService } from 'angular2-notifications';
// import 'rxjs/add/operator/switchMap';;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  @BlockUI() blockUI: NgBlockUI;
  title:string = "Plans Information"
  Table:any
  selected = 0;
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private mainService:MembresiasService,
    private router: Router
  ) { }

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.cargarAll();
  }

  cargarAll(){
    this.blockUI.start();
    this.mainService.getAll()
                        .then(response => {
                          this.Table = response;
                          // console.log(response);

                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear
                          this.blockUI.stop();
                          this.createError(error)
                        })

  }

  seleccionar(data:any){
    $('#btnContinue').attr("disabled", false);
    this.Table.forEach(element => {
        element.selected = false;
    });

    this.Table[this.Table.findIndex(el => el.id==data.id)].selected = true;

    // console.log(this.Table);


  }
  goBack(){
    this.location.back();
  }
  comprarPlan(){
    let selected = this.Table.findIndex(el => el.selected);
    let selectedPlan = selected>=0?this.Table[selected]:'';
    $('#alertSpoiler').removeClass('d-none');
    // console.log(selectedPlan);

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
