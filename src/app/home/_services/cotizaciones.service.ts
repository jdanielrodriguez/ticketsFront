import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
providedIn: 'root',
})
export class CotizacionesService {

  	headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=UTF-8'})
  private basePath:string = path.path

  private token = '';

  constructor(private http:HttpClient){

    this.reloadToken()

  }

  private handleError(error:any):Promise<any> {
  console.error("ha ocurrido un error")
  console.log(error)
  return Promise.reject(error.message || error)
  }
  reloadToken(token?){
    let datos = token?token:localStorage.getItem('token');
    if(datos){
      this.token = (datos);
    }else{
      this.token = path.token
    }
    this.headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': 'Bearer ' + this.token});
  }
      getAll():Promise<any> {
        this.reloadToken()
      let url = `${this.basePath}/proformas`
        return this.http.get(url,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }


      getAllMine(id):Promise<any> {
      let url = `${this.basePath}/more/proformas/${id}`
        this.reloadToken()
        return this.http.get(url,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }


      getAllMineCreador(id):Promise<any> {
        // console.dir(this.headers);
      let url = `${this.basePath}/mine/proformas/${id}`
        this.reloadToken()
        return this.http.get(url,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }


      create(form):Promise<any> {
      let url = `${this.basePath}/proformas`
        this.reloadToken()
        return this.http.post(url,form,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }

      creates(form):Promise<any> {
      let url = `${this.basePath}/proforma`
        this.reloadToken()
        return this.http.post(url,form,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response.json())
                            return response;
                          })
                          .catch(this.handleError)
      }

      delete(id):Promise<any> {
      let url = `${this.basePath}/proformas/${id}`
        this.reloadToken()
        return this.http.delete(url,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }

      update(form):Promise<any> {
      let url = `${this.basePath}/proformas/${form.id}`
        this.reloadToken()
        return this.http.put(url,form,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }

      getSingle(id:number):Promise<any> {
      let url = `${this.basePath}/proformas/${id}`
        this.reloadToken()
        return this.http.get(url,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }

}
