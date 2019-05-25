import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from "../../_services/auth.service";

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;
import { BlockUI, NgBlockUI } from 'ng-block-ui';

declare var $: any
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  constructor(
    private _service: NotificationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private mainService: AuthService
  ) { }
  @BlockUI() blockUI: NgBlockUI;
  mainData:any


  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.mainData = {
      hash:'',
      currentHash:'',
      repHash:'',
      username:localStorage.getItem('currentEmail'),
      id:+localStorage.getItem('currentId'),
      type:'changepass'
    }
  }
  goBack(){
    this.location.back();
  }
  changePass(){
    // console.log(this.mainData.hash);
    this.blockUI.start()
    this.mainService.recovery(this.mainData)
                    .then( response => {
                      // console.log(response);
                      this.createSuccess('Password changed')
                      $('#ActualizaPass').modal('hide');
                      this.blockUI.stop()
                      this.router.navigate([`./../../settings/profile`])
                    })
                    .catch( error => {
                      this.createError(error)
                      this.blockUI.stop()
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
