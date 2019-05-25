import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
providedIn: 'root',
})
export class ProjectsService {

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
  this.headers.append('Content-Type', 'application/json');
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
    let url = `${this.basePath}/licitaciones`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }


    getAllMine(id):Promise<any> {
    let url = `${this.basePath}/more/licitaciones/${id}`

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
    this.reloadToken();
    let url = `${this.basePath}/licitaciones`
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    delete(id):Promise<any> {
    let url = `${this.basePath}/licitaciones/${id}`
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
    let url = `${this.basePath}/licitaciones/${form.id}`
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
    let url = `${this.basePath}/licitaciones/${id}`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getSingleLicitacion(data:any):Promise<any> {
    let url = `${this.basePath}/detail/${data.id}/licitaciones/${data.creadorId}`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getSingleMineLicitacion(data:any):Promise<any> {
    let url = `${this.basePath}/detailMine/${data.id}/licitaciones/${data.proformaId}`
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
