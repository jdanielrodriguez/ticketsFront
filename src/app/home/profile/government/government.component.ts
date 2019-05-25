import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavComponent } from "./../../nav.component";

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { NotificationsService } from 'angular2-notifications';
import { BisService } from "./../../_services/bis.service";
import { UsersService } from "./../../_services/users.service";
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// // import 'rxjs/add/operator/switchMap';;

declare var $: any

@Component({
  selector: 'app-government',
  templateUrl: './government.component.html',
  styleUrls: ['./government.component.css']
})
export class GovernmentComponent implements OnInit {

  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  @BlockUI() blockUI: NgBlockUI;type:string = ''
  SelectedData:any = null;
  id:any = localStorage.getItem('currentId');
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private nav:NavComponent,
    private BisService: BisService,
    private UsersService: UsersService,
    private router: Router
  ) { }
  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    let idTemp = '';
    if(this.route.params){
      // this.route.params.pipe(
      //   switchMap( (params:Params) => idTemp+= params['type'])
      // );
      idTemp = this.route.snapshot.paramMap.get("type");
      // this.route.params
      //             .switchMap((params: Params) => (params['type']))
      //             .subscribe(response => {
      //                               idTemp+=response
      //                           });
      this.type = idTemp
      switch (idTemp) {
        case "avatar":{
          break;
        }
        case "goverment":{
          break;
        }
        case "patent":{
          break;
        }
        default:{
          break;
        }
      }

    }
  }

  upload(inputValue): void {
    this.blockUI.start();
    inputValue = inputValue.target
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
    let result = (myReader.result+'').split(',')
    let data = {
        entity:this.type+'s',
        base64String: result[1]
    }
        this.BisService.upload(data)
                        .then(response => {
                          let id = +localStorage.getItem('currentId');

                          let data2 = null
                          this.UsersService.getSingle(id).then(response1 => {
                              data2 = response1
                              data2.avatar = response.url
                              this.UsersService.update(data2)
                                              .then(response1 => {
                                                localStorage.setItem('currentAvatar',response1.avatar)
                                                setTimeout(() => {
                                                  localStorage.setItem('currentAvatar',response1.avatar)
                                                  this.blockUI.stop();
                                                }, 500);

                                                setTimeout(() => {
                                                  this.router.navigate([`./../../dashboard/home`])
                                                }, 600);

                                                // console.log('response: ',response1);
                                                // this.getOne({id:response1.bisId})
                                                this.blockUI.stop();
                                              }).catch(error => {
                                                console.clear
                                                this.blockUI.stop();
                                                this.createError(error)
                                                setTimeout(() => {this.blockUI.stop();}, 500);
                                              })
                          }).catch(error => {
                            console.log(error);

                          })
                          this.blockUI.stop();
                        }).catch(error => {
                          console.clear
                          this.blockUI.stop();
                          this.createError(error)
                          setTimeout(() => {this.blockUI.stop();}, 500);
                        })


    }
    myReader.readAsDataURL(file);
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
