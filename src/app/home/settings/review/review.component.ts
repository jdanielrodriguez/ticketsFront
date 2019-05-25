import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from "./../../nav.component";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;

declare var $: any

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  Table: any;
  Comments: any;
  public _id: number;
  public search: any;
  agregados: any[] = [];
  selectedData: any;
  Id:any = '';
  calificacion=3;
  Biss:any = [
    {
      id:1,
      name:"Sellet/Company",
      description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
      range:3
    }
  ]
  ranking=2;
  //Servicio el cual se va a trabajar
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private nav:NavComponent,
    private location: Location,
    private router: Router
  ) { }

  //Llamar los metodos que se van a utilizar
  ngOnInit() {


    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.cargarAll();
    this.cargarComments();
  }

  cargarAll(){
    // this.blockUI.start();
    this.Biss = [
      {
        id:1,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:2,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:4
      },
      {
        id:3,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:2
      },
      {
        id:4,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:5
      },
      {
        id:5,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:1
      },
      {
        id:6,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:2
      },
      {
        id:7,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:8,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:9,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:10,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:11,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:12,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:13,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:14,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:15,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:16,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:17,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:18,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:19,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      },
      {
        id:20,
        name:"Sellet/Company",
        description:"Some quick example text to build on the card title and make up the bulk of the card's content.",
        range:3
      }
    ]
    this.Table = [
      {
        id:1,
        descripcion:"Category XXXX"
      },
      {
        id:2,
        descripcion:"Category XXXX"
      },
      {
        id:1,
        descripcion:"Category XXXX"
      },
      {
        id:1,
        descripcion:"Category XXXX"
      },
      {
        id:1,
        descripcion:"Category XXXX"
      },
      {
        id:1,
        descripcion:"Category XXXX"
      },
      {
        id:1,
        descripcion:"Category XXXX"
      },
      {
        id:1,
        descripcion:"Category XXXX"
      }
    ]
  //  this.mainService.getAll()
  //                       .then(response => {
  //                         this.Table = response;
  //                         this.loadingClose.nativeElement.click();
  //                       }).catch(error => {

  //                         console.clear
  //                         this.loadingClose.nativeElement.click();
  //                         this.createError(error)
  //                       })

    }



    removeShoppingCar(data: any) {
      this.nav.removeShoppingCar(data);
      this.agregados.splice(this.agregados.findIndex(dat => {
        return dat.id == data.id
      }), 1)
      localStorage.setItem('carrito', JSON.stringify(this.agregados));


      this.create("Se eliminó el Bis de tu lista de comparacion");
    }

    addShoppingCar(data:any){

      this.agregados.push(data);
      this.nav.addShoppingCar(data);
      localStorage.setItem('carrito', JSON.stringify(this.agregados));
      // console.log(this.agregados);

          this.create("Listo para Comparar")
      //console.log(this.agregados.length);
      //location.reload();
    }

    cargarComments(){
      // this.blockUI.start();
      this.Comments =
      [
        {
          id:1,
          nombre:"Customer's Name",
          calificacion:3,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:4,
              fecha:"when the review was created",
              description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
            },
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:2,
              fecha:"when the review was created",
              description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
            }
          ]
        },
        {
          id:1,
          nombre:"Customer's Name",
          calificacion:5,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[

          ]
        },
        {
          id:1,
          nombre:"Customer's Name",
          calificacion:3,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[

          ]
        },
        {
          id:1,
          nombre:"Customer's Name",
          calificacion:3,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[

          ]
        },
        {
          id:1,
          nombre:"Customer's Name",
          calificacion:3,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[

          ]
        },
        {
          id:1,
          nombre:"Customer's Name",
          calificacion:3,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:4,
              fecha:"when the review was created",
              description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
            },
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:4,
              fecha:"when the review was created",
              description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
            },
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:4,
              fecha:"when the review was created",
              description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
            },
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:4,
              fecha:"when the review was created",
              description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
            }
          ]
        },
        {
          id:1,
          nombre:"Customer's Name",
          calificacion:3,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[

          ]
        },
      ]
          // this.mainService.getAll()
          //                 .then(response => {
          //                   this.Table = response;
          //                   this.loadingClose.nativeElement.click();
          //                 }).catch(error => {
          //                   console.clear
          //                   this.loadingClose.nativeElement.click();
          //                   this.createError(error)
          //                 })

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
