import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;

declare var $: any
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  title:string = "Analytics"
  calificacion:number = 3;
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
  constructor() { }

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
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
