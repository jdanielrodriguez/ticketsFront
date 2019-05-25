import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from "./../../_services/users.service";
import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any
@Component({
  selector: 'app-changeemail',
  templateUrl: './changeemail.component.html',
  styleUrls: ['./changeemail.component.css']
})
export class ChangeemailComponent implements OnInit {

  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  SelectedData:any = null;
  id:any = localStorage.getItem('currentId');
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private UsersService:UsersService,
    ) { }
    @BlockUI() blockUI: NgBlockUI;
  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.cargarOne();
  }

  cargarOne(){
    this.SelectedData = null;
    this.UsersService.getSingle(this.id)
                    .then(response => {
                      this.SelectedData = response;
                      // console.log(response);

                      this.blockUI.stop();
                    }).catch(error => {
                      console.clear
                      this.blockUI.stop();
                      this.createError(error)
                    })
  }

  changeEmail(formValue:any){
    this.blockUI.start();
    setTimeout(() => {

        this.blockUI.stop();
    }, 1000);
    formValue.id = localStorage.getItem('currentId');
    this.SelectedData.email = formValue.email ;
    this.SelectedData.id = formValue.id ;
    formValue=this.SelectedData;
    this.UsersService.update(formValue)
                      .then(response => {
                        this.createSuccess('Email Changed')
                        $('#email').val('')
                        $('#password').val('')
                        this.SelectedData = response
                        console.clear


                        this.blockUI.stop();
                      }).catch(error => {
                        console.clear

                        this.blockUI.stop();
                        this.createError(error)
                      })


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

  createSuccess(success) {
        this._service.success('¡Éxito!', success);

  }
  createError(error) {
        this._service.error('¡Error!', error);

  }

}
