import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav-bar',
  templateUrl: './dashboard-nav-bar.component.html',
  styles: []
})
export class DashboardNavBarComponent implements OnInit {
  tipoUsuario:number = +localStorage.getItem('currentTipoUsuarioId');
  currenturl = ""
  urlList = ['selling', 'buying', 'bis', 'products']

  constructor(
    private router: Router
  ) { }

  setActiveClass(currentUrl, evalUrl) {
    return currentUrl == evalUrl;
  }

  ngOnInit() {
    this.currenturl = this.router.url.split('/')[2];
  }

}
