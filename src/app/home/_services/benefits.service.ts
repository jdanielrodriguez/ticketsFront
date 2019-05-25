import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
providedIn: 'root',
})
export class BenefitsService {
  private host = path.path;
  private token = localStorage.getItem('token');



  headers = new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token
  });

  constructor(
    private http: HttpClient
  ) {
  this.reloadToken();

   }
  reloadToken(token?){
    let datos = token?token:localStorage.getItem('token');
    if(datos){
      this.token = (datos);
    }else{
      this.token = path.token
    }
    this.headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + this.token});
  }
  private handleError(error:any):Promise<any> {
    console.error("ha ocurrido un error")
    console.log(error)
    return Promise.reject(error.message || error)
  }

  getAll():Promise<any> {
    let url = `${this.host}/benefits`;
    this.reloadToken();
    return this.http.get(url, {headers: this.headers })
                    .toPromise()
                    .then( response => {
                      return response;
                    })
                    .catch(this.handleError);
  }

}
