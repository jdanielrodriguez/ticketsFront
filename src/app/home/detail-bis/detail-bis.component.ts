import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from "./../nav.component";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { NotificationsService } from 'angular2-notifications';
import { BisService } from "./../_services/bis.service";
import { Subject } from 'rxjs';
// // import 'rxjs/add/operator/switchMap';;
import { switchMap } from 'rxjs/operators';

declare var $: any

@Component({
  selector: 'app-detail-bis',
  templateUrl: './detail-bis.component.html',
  styleUrls: ['./detail-bis.component.css']
})
export class DetailBisComponent implements OnInit {
  Table: any;
  faqs: any;
  Comments: any;
  contact: boolean = true;
  public _id: number;
  public search: any;
  agregados: any[] = [];
  selectedData: any;
  Id:any = '';
  ranking=5;
  @BlockUI() blockUI: NgBlockUI;
  generalModalDetalle=true;
  //Servicio el cual se va a trabajar
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private nav:NavComponent,
    private BisService: BisService,
    private router: Router
  ) { }
  collapse(str:string){
    if($('#'+str).collapse("show")){
      $('#'+str).collapse("hide")

    }else{
      $('#'+str).collapse("show")

    }
  }
  //Llamar los metodos que se van a utilizar
  ngOnInit() {


    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    if(this.route.params){
      // this.route.params.pipe(
      //   switchMap( (params:Params) => idTemp+= params.get('id'))
      // )
      let idTemp = this.route.snapshot.paramMap.get("id");

      // this.route.params
      //             .switchMap((params: Params) => (params['id']))
      //             .subscribe(response => {
      //                               idTemp+=response
      //                           });
      // console.log(idTemp);

      this.getOne(idTemp)
          // this.getFaqs(idTemp)

    }
    this.cargarAll();
    // this.cargarComments();
  }
  contactSeller(){
    localStorage.removeItem('lastLinkUrl')
    if (!localStorage.getItem('currentUser')) {
      $('#loginTemplate').removeClass('container');
      $('#generalModalDetalle').modal("show");
    }else{
      this.router.navigate([`./../../contact/seller/${this.selectedData.id}`])
    }
  }
  getOne(id){
    this.blockUI.start();
    let thisId = localStorage.getItem('currentId');
    this.BisService.getSingle(id)
                      .then(response => {
                        // console.log(response);
                        this.selectedData = response;
                        this.selectedData.apellido = ((this.selectedData.Usuario.primerApellido)?this.selectedData.Usuario.primerApellido:'')+' '+((this.selectedData.Usuario.segundoApellido)?this.selectedData.Usuario.segundoApellido:'')
                        this.selectedData.nombre = ((this.selectedData.Usuario.primerNombre)?this.selectedData.Usuario.primerNombre:'')+' '+((this.selectedData.Usuario.segundoNombre)?this.selectedData.Usuario.segundoNombre:'')
                        if(response.Usuario.id == thisId){
                          this.contact = false;
                        }

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
  getFaqs(id){
    this.BisService.getFaqs(id)
                      .then(response => {
                        this.faqs = response;
                        // console.log(response);

                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError("This Bis has no FAQS")
                      })
  }

  cargarAll(){
    this.blockUI.start();
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
    this.BisService.getTop(4)
                    .then(response => {
                      response.forEach(element => {
                        if(this.agregados.find(data => {
                          return data.id == element.id
                        })){
                          element.compare = true;
                          element.ranking = 5;
                        }else{
                          element.compare = false;
                          element.ranking = 5;
                        }

                      });
                      this.Table = response;
                      // console.log(response);

                      this.blockUI.stop();
                    }).catch(error => {

                      console.clear

                      this.blockUI.stop();
                      this.createError(error)
                    })
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
          calificacion:5,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:5,
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
          calificacion:5,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[

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
          calificacion:5,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[

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
          calificacion:5,
          fecha:"when the review was created",
          description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.",
          comments:[
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:5,
              fecha:"when the review was created",
              description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
            },
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:5,
              fecha:"when the review was created",
              description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
            },
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:5,
              fecha:"when the review was created",
              description:"Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment."
            },
            {
              id:1,
              nombre:"Customer's Name",
              calificacion:5,
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
      ]
          // this.mainService.getAll()
          //                 .then(response => {
          //                   this.Table = response;
          //                   this.blockUI.stop();
          //                 }).catch(error => {
          //                   console.clear
          //                   this.blockUI.stop();
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
