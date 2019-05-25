import { Component, OnInit } from '@angular/core';
import { BenefitsService } from '../../../home/_services/benefits.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
declare var $: any

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styles: []
})
export class BenefitsComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  benefitsList = [];

  constructor(
    private benefits: BenefitsService
  ) { }

  getAll(){
    this.blockUI.start('Cargando');

    this.benefits.getAll()
                 .then( response => {
                  this.benefitsList = response;
                  this.blockUI.stop();
                 })
                 .catch(error => {
                   this.blockUI.stop();
                   throw error;
                 })
  }

  ngOnInit() {
    $('#searchContent').addClass('d-none');
    $('#inSeachForm').removeClass('d-none');
    $('#logoTipo').addClass('d-none');
    this.getAll();
  }

}
