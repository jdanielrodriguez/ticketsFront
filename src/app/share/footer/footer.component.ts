import { Component, OnInit } from '@angular/core';
import { CategorysService } from '../../home/_services/categorys.service'
import { VirtualTimeScheduler } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categorias: any;
  constructor(
    private categoryServce: CategorysService,
    private router: Router
  ) { }
  navegar(url:string,id?:number){
    this.router.navigate([url])
    if(id && id>0){
      localStorage.setItem('idCategory',id+'');
    }
  }
  getCategorias() {
    this.categoryServce.getMasters().then(response => {
      this.categorias = response;
    }).catch(error => {
      console.log(error);
    })
  }

  ngOnInit() {
    this.getCategorias();
  }

}
