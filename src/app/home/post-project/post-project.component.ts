import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ProjectsService } from "../_services/projects.service";
import { CategorysService } from "../_services/categorys.service";
import { SubCategorysService } from "../_services/sub-categorys.service";
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { switchMap } from 'rxjs/operators';

declare var $: any
interface project {
  id? : number
  titulo? : string
  time? : string
  descripcion? : string
  tipoPago : string
  minimo : number
  maximo : number
  categoriaId : number
  subCategoriaId : number
  creadorId : number
  inicio?: Date,
  fin?: Date
}
@Component({
  selector: 'app-post-project',
  templateUrl: './post-project.component.html',
  styleUrls: ['./post-project.component.css']
})
export class PostProjectComponent implements OnInit {
  selected:boolean = false;
  title:any = "Registro"
  Table:any
  comboParent:any
  @BlockUI() blockUI: NgBlockUI;
  id:number = +localStorage.getItem('currentId');
  categoria:any = ''
  projectTitle:any = ''
  subcategoria:any
  categorias:any
  subCategorias:any
  selector:any = "largo_plazo";
  price:any = {
    min: 0,
    max: 500000
  };
  selectedData:project = {
    tipoPago : this.selector,
    minimo : this.price.min,
    maximo : this.price.max,
    categoriaId : this.categoria,
    subCategoriaId : this.subcategoria,
    creadorId : this.id
  }
  someRage = [0,50000]
  public rowsOnPage = 5;
  public search:any
  constructor(
      private CategorysService: CategorysService,
      private route: ActivatedRoute,
      private router: Router,
      private SubCategorysService: SubCategorysService,
      private _service: NotificationsService,
      private mainService: ProjectsService,
    ) { }

  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('html, body').animate({scrollTop:0}, '300');
    $('#logoTipo').addClass('d-none');
    this.cargarCategorias()
    let idTemp = '';
    try{
      idTemp = this.route.snapshot.paramMap.get("id");
      // this.route.params.pipe(
      //   switchMap( (params:Params) => idTemp += params['id'])
      // )
      // this.route.params
      //             .switchMap((params: Params) => (params['id']))
      //             .subscribe(response => {
      //                               idTemp+=response
      //                           });
      this.projectTitle = idTemp.replace('-',' ');
      idTemp = localStorage.getItem('currentProjectActiveEdit');

      this.cargarSingle(+idTemp)
    }catch(e){
      this.selectedData = null
    }
    setTimeout(() => {
      $(".noUi-connect").addClass("noUi-connect1");
      $(".noUi-connect").removeClass("noUi-connect");
      $("input[name=tipoPago]").change(element =>{
        $(".noUi-connect").addClass("noUi-connect1");
        $(".noUi-connect").removeClass("noUi-connect");
      })
    }, 500);
  }

  select(dat:boolean){
    this.selected = dat;
  }

  cargarSingle(id:number){
    this.blockUI.start()
    this.mainService.getSingle(id)
                      .then(response => {
                        this.selectedData = response;
                        this.price.min = response.minimo;
                        this.price.max = response.maximo;
                        this.categoria = response.categoriaId;
                        this.cargarSubCategorias()
                        console.clear
                        // console.log(response);

                        this.blockUI.stop()
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop()
                        this.createError(error)
                      })
  }

  insert(formValue:any){
    formValue.tipoPago = this.selector
    formValue.minimo = this.price.min
    formValue.maximo = this.price.max
    formValue.categoriaId = this.categoria
    formValue.subCategoriaId = this.subcategoria
    formValue.creadorId = this.id
    // console.log(formValue);

    this.blockUI.start()
    this.mainService.create(formValue)
                      .then(response => {
                        this.blockUI.stop()
                        this.blockUI.stop()
                        // console.log(response);
                        setTimeout(() => {
                        this.blockUI.stop()
                        this.createSuccess('Project was publish Success')
                        this.blockUI.stop()
                        }, 300);
                        setTimeout(() => {
                          this.router.navigate([`./dashboard/home`])
                        }, 500);

                        console.clear
                        this.blockUI.stop()
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop()
                        this.createError(error)
                      })


  }

  cargarCategorias(){
    this.CategorysService.getAll()
                    .then(response => {
                      this.categorias = response;
                      // console.log(response);

                      this.blockUI.stop()
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop()
                      this.createError(error)
                    })
  }

  cargarSubCategorias(){
    if(this.categoria){
    this.SubCategorysService.getAllParent(this.categoria)
                    .then(response => {
                      this.subCategorias = response;
                      // console.log(response);

                      this.blockUI.stop()
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop()
                      this.createError(error)
                    })
                  }else{
                    this.blockUI.stop()
                    this.createError("Choise a Category")

                  }
          setTimeout(() => {
            this.blockUI.stop()
          }, 500);
  }

  update(formValue:any){
    formValue.titulo= this.selectedData.titulo
    formValue.descripcion= this.selectedData.descripcion
    formValue.inicio= (this.selectedData.inicio)
    formValue.fin= (this.selectedData.fin)
    formValue.tipoPago= this.selector
    formValue.minimo= this.price.min
    formValue.maximo= this.price.max
    formValue.categoriaId= this.categoria
    formValue.subCategoriaId=  this.selectedData.subCategoriaId
    formValue.creadorId= this.selectedData.creadorId
    formValue.id= this.selectedData.id

    // console.log(formValue);

    this.blockUI.start()
    this.mainService.update(formValue)
                      .then(response => {
                        this.blockUI.stop()
                        this.blockUI.stop()
                        // console.log(response);
                        setTimeout(() => {
                        this.blockUI.stop()
                        this.createSuccess('Project was publish Success')
                        this.blockUI.stop()
                        }, 300);
                        setTimeout(() => {
                          this.router.navigate([`./dashboard/buying/my-projects`])
                        }, 500);

                        console.clear
                        this.blockUI.stop()
                      }).catch(error => {
                        console.clear
                        this.blockUI.stop()
                        this.createError(error)
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
          onChange(data){
            this.price.min = data[0]
            this.price.max = data[1]
            // console.log(data);

          }
    createSuccess(success) {
                this._service.success('¡Éxito!',success)

    }
    createError(error) {
                this._service.error('¡Error!',error)

    }
}
