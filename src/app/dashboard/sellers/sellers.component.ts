import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NotificationsService } from 'angular2-notifications';
import { Subject } from 'rxjs';
// import 'rxjs/add/operator/switchMap';;

declare var $: any
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styles: []
})
export class SellersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
  }

}
