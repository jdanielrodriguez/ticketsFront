import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
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
  constructor(
    private _service: NotificationsService,
  ) { }

  ngOnInit() {
  }

}
