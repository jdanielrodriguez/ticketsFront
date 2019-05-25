import { Component, OnInit, Input } from '@angular/core';
import { NavComponent } from "./../../home/nav.component";
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-bis-card',
  templateUrl: './bis-card.component.html',
  styles: []
})
export class BisCardComponent implements OnInit {
  @Input() data:any;
  agregados: any[] = [];

  constructor(
    private _service: NotificationsService,
    private nav:NavComponent
  ) { }

  ngOnInit() {
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
  }

  removeShoppingCar(data: any) {
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
    this.agregados.splice(this.agregados.findIndex(dat => {
      return dat.id == data.id
    }), 1)
    localStorage.setItem('carrito', JSON.stringify(this.agregados));
    this.nav.removeShoppingCar(data);

    this.create("Se eliminó el Bis de tu lista de comparacion");
  }

  addShoppingCar(data:any){
    let datos = localStorage.getItem('carrito');
    if(datos){
      this.agregados = JSON.parse(datos);
    }
    this.agregados.push(data);
    this.nav.addShoppingCar(data);
    localStorage.setItem('carrito', JSON.stringify(this.agregados));
    // console.log(this.agregados);

        this.create("Listo para Comparar")
    //console.log(this.agregados.length);
    //location.reload();
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
