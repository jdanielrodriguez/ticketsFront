import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;

declare var $: any
@Component({
  selector: 'app-tools-grow',
  templateUrl: './tools-grow.component.html',
  styleUrls: ['./tools-grow.component.css']
})
export class ToolsGrowComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  title:string = "Active Bis"
  Table =
    [
      {
        id:1,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:true
      },
      {
        id:2,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:false
      },
      {
        id:3,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:true
      },
      {
        id:4,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:false
      },
      {
        id:5,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:false
      },
      {
        id:6,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:true
      },
      {
        id:7,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:true
      },
      {
        id:8,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:true
      },
      {
        id:9,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:true
      },
      {
        id:10,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:true
      },
      {
        id:11,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:true
      },
      {
        id:12,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:false
      },
      {
        id:13,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:false
      },
      {
        id:14,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:false
      },
      {
        id:15,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:false
      },
      {
        id:16,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:false
      },
      {
        id:17,
        nombre:"Seller/company",
        descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dignissim facilisis sodales. Integer vehicula",
        favorito:false
      },
    ]

  navSelect:number = 0;
  constructor() { }

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
  }

}
