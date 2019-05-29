import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { EventosService } from "./../_services/eventos.service";
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  idEvent = null
  SelectedData:any = null

  constructor(
    private route: ActivatedRoute,
    private _service: NotificationsService,
    private mainService: EventosService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getParams();
  }

  getParams(){
    this.idEvent = this.route.snapshot.paramMap.get("id");

  }

  cargarSingle(id:number){

    this.mainService.getAll()

  }
  navegar(url:string,id?:number){
    this.router.navigate([url])
  }

  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: false,
    animate: "scale",
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };

  createSuccess(success) {
        this._service.success('¡Éxito!',success)

  }
  createError(error) {
        this._service.error('¡Error!',error)

  }

}
