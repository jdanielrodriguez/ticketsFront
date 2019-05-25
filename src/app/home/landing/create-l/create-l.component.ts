import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;

declare var $: any
@Component({
  selector: 'app-create-l',
  templateUrl: './create-l.component.html',
  styleUrls: ['./create-l.component.css']
})
export class CreateLComponent implements OnInit {
  picture=""
  vista:number=2;
  addReq:boolean=false;
  constructor() { }
  EditUserForm = ''
  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
  }
  subirImagenes(){

  }
  agregar(){

  }
  enviar(rut:number){
    this.vista = rut;
    console.log(this.vista);

  }
  update(data){

  }
}
