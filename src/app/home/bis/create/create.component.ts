import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BisService } from "./../../_services/bis.service";
import { CategorysService } from "./../../_services/categorys.service";
import { SubCategorysService } from "./../../_services/sub-categorys.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// // import 'rxjs/add/operator/switchMap';;
import { switchMap } from 'rxjs/operators'

import { BlockUI, NgBlockUI } from 'ng-block-ui';

interface Biss {
  id?: string,
  bis: boolean,
  titulo: string,
  descripcion?: string,
  imagen?: string,
  precio?: number,
  precioEntregaUrgente?: number,
  tags?: string,
  fechaVencimiento?: string,
  publicado: number,
  estado: boolean,
  tipoBisId: number,
  tipoCobro: number,
  usuarioId: number,
  categoriaId?: number,
  subCategoriaId?: number,
  pagina?: number,
  ImagenesBis?:any[],
  ArchivosBis?:any[]
}

declare var $: any

import { path } from "../../../config.module";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  vista:number=1;
  @BlockUI() blockUI: NgBlockUI;
  addReq:boolean=false;
  addFAQ:boolean=false;
  private basePath:string = path.path
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private CategorysService: CategorysService,
    private SubCategorysService: SubCategorysService,
    private BisService:BisService
  ) { }
  comboFAQS = []
  comboREQS = []
  categorias = null
  subCategorias = null
  isBis = false

  Bis:Biss = {
    bis:true,
    titulo: "",
    descripcion: "",
    precio: 0.00,
    precioEntregaUrgente: 0,
    tags: '',
    fechaVencimiento: null,
    publicado: 0,
    tipoCobro: 1,
    estado: true,
    tipoBisId: null,
    usuarioId: null,
    categoriaId: null,
    subCategoriaId: null
  }
  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    try{
      let idTemp = '';
      if(this.route.params){
        // this.route.params.pipe(
        //   switchMap( (params:Params) => idTemp += params['id'])
        // )
        idTemp = this.route.snapshot.paramMap.get("id");
        // this.route.params
        //             .switchMap((params: Params) => (params['id']))
        //             .subscribe(response => {
        //                               idTemp+=response
        //                           });
        setTimeout(function(){
          this.isBis = true
        },500)
        this.Bis.id = idTemp.split(':')[0];
        this.vista = +idTemp.split(':')[1]
        this.getOne({id:idTemp.split(':')[0]});
      }

    }
    catch(e){
      this.cargarCategorias()
    }
  }

  cargarCategorias(){
    this.CategorysService.getAll()
                    .then(response => {
                      this.categorias = response;
                      // console.log(response);

                      this.blockUI.stop();
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop();
                      this.createError(error)
                    })
  }

  cargarFAQS(){
    this.comboFAQS = null;
    this.BisService.getMineFAQS(this.Bis.id)
                    .then(response => {
                      this.comboFAQS = response;
                      // console.log(response);

                      this.blockUI.stop();
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop();
                      this.createError(error)
                    })
  }

  cargarREQS(){
    this.comboREQS = null;
    this.BisService.getMineREQS(this.Bis.id)
                    .then(response => {
                      this.comboREQS = response;
                      // console.log(response);

                      this.blockUI.stop();
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop();
                      this.createError(error)
                    })
  }

  cargarSubCategorias(){
    if(this.Bis.categoriaId){
    this.SubCategorysService.getAllParent(this.Bis.categoriaId)
                    .then(response => {
                      this.subCategorias = response;
                      // console.log(response);

                      this.blockUI.stop();
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop();
                      this.createError(error)
                    })
                  }else{
                    this.blockUI.stop();
                    this.createError("Choise a Category")

                  }

  }
  getOne(id){
    this.isBis = true;
    $('html, body').animate({scrollTop:0}, '300');
    this.blockUI.start();
    let data = {
      id: id.id
    }
    this.BisService.getSingle(id.id)
                      .then(response => {
                        this.Bis = response;
                        // console.log(this.Bis);
                        this.cargarCategorias()
                        this.cargarFAQS()
                        this.cargarREQS()
                        this.cargarSubCategorias()
                        this.blockUI.stop();
                      }).catch(error => {
                        this.createError("Bis was not Found")
                        console.clear

                        this.blockUI.stop();

                      })
  }
  insert(data){
    this.Bis.usuarioId = +localStorage.getItem('currentId');
    this.Bis.pagina = data.pagina
    this.isBis = false;
    // console.log(this.Bis);
    // this.BisService.create(this.Bis)
    //                   .then(response => {
    //                     this.Bis.id = response.id;
    //                     this.blockUI.stop();
    //                   }).catch(error => {
    //                     console.clear
    //                     this.blockUI.stop();
    //                     this.createError(error)
    //                   })
  }

  update(data:any){
    $('html, body').animate({scrollTop:0}, '300');
    this.isBis = true;
    this.blockUI.start();
    let prueba = true;
    if(data.pagina==7){
      this.blockUI.stop();
      if(
        this.Bis.titulo != '' &&
        this.Bis.descripcion != '' &&
        this.Bis.tipoBisId != null &&
        this.Bis.usuarioId != null &&
        this.Bis.categoriaId != null &&
        this.Bis.ImagenesBis.length > 0
        ){
          prueba = true;
          this.vista = 7;
      }else{
        prueba = false;
        // this.vista = this.vista-1;
        if(
          this.Bis.titulo == ''
          ){
            this.blockUI.stop();
            this.createError("Title required")
          }
        if(
          this.Bis.descripcion == ''
          ){
            this.blockUI.stop();
            this.createError("Description required")
          }
          if(
          this.Bis.tags == ''
          ){
            this.blockUI.stop();
            this.createError("Tags required")
          }
          if(
          this.Bis.ImagenesBis.length <= 0
          ){
            this.blockUI.stop();
            this.createError("Images required")
          }
          if(
          this.Bis.categoriaId == null
          ){
            this.blockUI.stop();
            this.createError("Categoria required")
          }
          if(
          this.Bis.tipoBisId == null
          ){
            this.blockUI.stop();
            this.createError("Tipo Bis required")
          }
          if(
          this.Bis.usuarioId == null
          ){
            this.blockUI.stop();
            this.createError("You have to login")
          }
        // console.log(this.Bis);

        this.blockUI.stop();
        this.createError("Complete all the requeriment")
      }
    }

    if(data.pagina==2){
      if(
        this.Bis.tipoBisId == null
        ){
          prueba = false;
          this.vista = this.vista-1;
        this.blockUI.stop();
        this.createError("Complete all the requeriment")
      }
    }

    if(data.pagina==3){
      if(
        this.Bis.titulo == '' ||
        this.Bis.categoriaId == null ||
        this.Bis.subCategoriaId == null
        ){
          prueba = false;
          this.vista = this.vista-1;
        this.blockUI.stop();
        this.createError("Complete all the requeriment")
      }
    }

    if(data.pagina==5){
      if(
        this.Bis.descripcion == ''
        ){
          prueba = false;
          this.vista = this.vista-1;
        this.blockUI.stop();
        this.createError("Complete all the requeriment")
      }
    }

    if(prueba){
      // console.log(data);

      this.Bis.usuarioId = +localStorage.getItem('currentId');
      if(data.inicial){
        this.BisService.create(this.Bis)
                        .then(response => {
                          this.blockUI.stop();
                          this.getOne({id:response.id})
                          setTimeout(() => {
                            this.router.navigate([`./../update/bis`,response.id+':'+data.pagina])
                            this.vista = 2
                            }, 500);
                        }).catch(error => {
                          console.clear
                          this.blockUI.stop();
                          this.createError(error)
                        })
      }else{
        $('html, body').animate({scrollTop:0}, '300');
        this.BisService.update(this.Bis)
                        .then(response => {
                            this.router.navigate([`./../../../update/bis`,this.Bis.id+':'+data.pagina])
                            this.blockUI.stop();
                            this.getOne({id:response.id})
                          if(this.Bis.publicado==1&&data.fin){
                            this.create('Bis was Publish')
                            this.blockUI.stop();
                              this.router.navigate([`./../../../dashboard/bis/active`])
                          }else if(this.Bis.publicado==0&&data.fin){
                            this.create('Bis Publish pendient')
                            this.blockUI.stop();
                              this.router.navigate([`./../../../bis`,this.Bis.id])
                          }
                          // console.log('response: ',response);
                          // console.log('bis ',this.Bis)
                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear
                          this.blockUI.stop();
                          this.createError(error)
                        })
      }
    }





  }
  cambiarPage(pagina){
    this.vista = pagina;
    this.router.navigate([`./../../../update/bis`,this.Bis.id+':'+pagina])

  }
  createFAQ(formValue){
    let data = {
        bisId: this.Bis.id,
        titulo: formValue.nombreFAQ,
        respuesta: formValue.respuestaFAQ
    }
    this.blockUI.start();
    this.BisService.createFAQ(data)
                      .then(response => {
                        this.comboFAQS.push(response);
                        this.addFAQ=!this.addFAQ
                        $('#nombreFAQ').val('')
                        $('#respuestaFAQ').val('')
                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError(error)
                      })
  }

  createREQ(formValue){
    let data = {
        bisId: this.Bis.id,
        descripcion: formValue.descripcionREQ,
    }
    this.blockUI.start();
    this.BisService.createREQ(data)
                      .then(response => {
                        this.comboREQS.push(response);
                        this.addReq=!this.addReq
                        $('#descripcionREQ').val('')
                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError(error)
                      })
  }
  deleteIMG(id){
    this.blockUI.start();
    this.BisService.deleteIMG(id)
                      .then(response => {
                        this.getOne({id:this.Bis.id})
                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError(error)
                      })
  }
  deleteFILE(id){
    this.blockUI.start();
    this.BisService.deleteFILE(id)
                      .then(response => {
                        this.getOne({id:this.Bis.id})
                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop();
                        this.createError(error)
                      })
  }

  uploadIMG(inputValue): void {
    this.blockUI.start();
    inputValue = inputValue.target
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
    let result = (myReader.result+'').split(',')
    let data = {
        entity:'bis',
        base64String: result[1]
    }
      if(this.Bis.ImagenesBis && this.Bis.ImagenesBis.length<3){
        this.BisService.upload(data)
                        .then(response => {
                          // console.log('response: ',response);
                          let item = {
                            bisId: this.Bis.id,
                            url: response.url
                          }
                          this.BisService.uploadIMG(item)
                                          .then(response1 => {
                                            // console.log('response: ',response1);
                                            this.blockUI.stop();
                                            this.getOne({id:response1.bisId})
                                            $('#BisUpdate').val('')
                                            this.blockUI.stop();
                                          }).catch(error => {
                                            console.clear
                                            this.blockUI.stop();
                                            this.createError(error)
                                          })
                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear
                          this.blockUI.stop();
                          this.createError(error)
                        })
      }else{
        this.createError('Already has 3 images, please delete one before continue')
      }

    }
    myReader.readAsDataURL(file);
  }

  uploadFILE(inputValue): void {
    this.blockUI.start();
    inputValue = inputValue.target
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
    let result = (myReader.result+'').split(',')
    let data = {
        entity:'bis/file',
        base64String: result[1]
    }
      if(this.Bis.ArchivosBis && this.Bis.ArchivosBis.length<2){
        this.BisService.upload(data)
                        .then(response => {
                          // console.log('response: ',response);
                          let item = {
                            bisId: this.Bis.id,
                            url: response.url
                          }
                          this.BisService.uploadFILE(item)
                                          .then(response1 => {
                                            // console.log('response: ',response1);
                                            this.blockUI.stop();
                                            this.getOne({id:response1.bisId})
                                            $('#BisFileUpdate').val('')
                                          }).catch(error => {
                                            console.clear
                                            this.blockUI.stop();
                                            this.createError(error)
                                          })
                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear
                          this.blockUI.stop();
                          this.createError(error)
                        })
      }else{
        this.createError('Already has 2 files, please delete one before continue')
      }

    }
    myReader.readAsDataURL(file);
  }

  uploadVIDEO(inputValue): void {
    this.blockUI.start();
    inputValue = inputValue.target
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
    let result = (myReader.result+'').split(',')
    let data = {
        entity:'bis/video',
        base64String: result[1]
    }
      if(this.Bis.imagen==''){
        this.BisService.upload(data)
                        .then(response => {
                          // console.log('response: ',response);
                          this.Bis.imagen = response.url
                          this.BisService.update(this.Bis)
                                          .then(response1 => {
                                            // console.log('response: ',response1);
                                            this.blockUI.stop();
                                            this.getOne({id:response1.id})
                                            $('#BisVideoUpdate').val('')
                                          }).catch(error => {
                                            console.clear
                                            this.blockUI.stop();
                                            this.createError(error)
                                          })
                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear
                          this.blockUI.stop();
                          this.createError(error)
                        })
      }else{
        this.createError('Already has 1 video, please delete one before continue')
      }

    }
    myReader.readAsDataURL(file);
  }

  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: false,
    animate: 'fromLeft',
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
};

create(success) {
      this._service.success('Success!', success);

}
createError(error) {
      this._service.error('¡Error!', error);

}
}
