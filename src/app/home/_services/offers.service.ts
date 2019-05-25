import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
providedIn: 'root',
})
export class OffersService {

	headers = new HttpHeaders({
    'Content-Type' : 'application/json; charset=UTF-8'})
private basePath:string = path.path

private token = '';

constructor(private http:HttpClient){

  let datos = localStorage.getItem('token');
    if(datos){
      this.token = (datos);
    }else{
      this.token = path.token
    }
  this.headers.append('Authorization', 'Bearer ' + this.token );
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
    let url = `${this.basePath}/cotizaciones`
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }


    getAllMine(id):Promise<any> {
      this.reloadToken()
      let url = `${this.basePath}/more/cotizaciones/${id}`
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllMore(id):Promise<any> {
      this.reloadToken()
      let url = `${this.basePath}/mine/cotizaciones/${id}`
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }




    create(form:any):Promise<any> {
      let url = `${this.basePath}/cotizaciones`
      this.reloadToken()

      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    delete(id):Promise<any> {
    let url = `${this.basePath}/cotizaciones/${id}`
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
    let url = `${this.basePath}/cotizaciones/${form.id}`
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
    let url = `${this.basePath}/cotizaciones/${id}`
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
