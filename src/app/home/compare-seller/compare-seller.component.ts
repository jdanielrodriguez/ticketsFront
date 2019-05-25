import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from "./../nav.component";

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;

declare var $: any

@Component({
  selector: 'app-compare-seller',
  templateUrl: './compare-seller.component.html',
  styleUrls: ['./compare-seller.component.css']
})
export class CompareSellerComponent implements OnInit {
  Table: any;
  public _id: number;
  public search: any;
  selectedData: any;
  Id:any = '';
  type:any = '';
  searchContent:any = '';
  url:string = '../../../';
  agregados: any[] = [];

  //Servicio el cual se va a trabajar
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private nav:NavComponent
  ) { }

  //Llamar los metodos que se van a utilizar
  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.cargarAll();
  }
  goBack(){
    this.location.back();
  }

  cargarAll(){
    // this.blockUI.start();
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
      this.Table = this.agregados
    }

  }
  contactar(){
    let data = [];
    let ids = [];
    this.Table.forEach(element => {
      if(element.selected){
        element.Usuario.selected = element.selected;
        data.push(element.Usuario)
        ids.push(element)
      }
    });
    localStorage.setItem('carritoSelected',JSON.stringify(data));
    let serie = ''
    ids.forEach(element => {
      serie += element.id+":";
    });
    // serie = serie.substr(0,serie.length-1);
    localStorage.setItem('lastLinkUrl','./../../contact/sellers/'+ serie)
    if (!localStorage.getItem('currentUser')) {
      $('#loginTemplate').removeClass('container');
      $('#generalModalDetalle').modal("show");
    }else{
      this.router.navigate(['./../../contact/sellers/'+ serie])
    }
  }
    removeShoppingCar(data: any) {

      this.agregados.splice(this.agregados.findIndex(dat => {
        return dat.id === data
      }), 1)
      localStorage.setItem('carrito', JSON.stringify(this.agregados));

      this.create("Bis Removed");
      this.nav.removeShoppingCar(data);
      this.cargarAll()
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
