import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
  providedIn: 'root'
})
export class EventosFuncionesImagenesService {
	headers = new HttpHeaders({'Access-Control-Allow-Origin':'*',
  'cache-control':'no-cache',
  'server':'Apache/2.4.18 (Ubuntu)',
  'x-ratelimit-limit':'60',
  'x-ratelimit-remaining':'59'})
private basePath:string = path.path

constructor(private http:HttpClient){
  this.reloadToken()
}
private token = '';

reloadToken(token?){
  let datos = token?token:localStorage.getItem('token');
  if(datos){
    this.token = (datos);
  }else{
    this.token = token?token:btoa(path.token)
  }
  this.headers = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer ' + this.token});
}

private handleError(error:any):Promise<any> {
console.error("ha ocurrido un error")
console.log(error)
return Promise.reject(error.message || error)
}

    getAll():Promise<any> {
    let url = `${this.basePath}/api/eventosimgs`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }


    getAllFilter(data):Promise<any> {
    let filter = data.filter?"?filter="+data.filter:"";
    let url = `${this.basePath}/api/filter/${data.id}/eventosimgs/${data.state}${filter}`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }


    create(form):Promise<any> {
    let url = `${this.basePath}/api/eventosimgs`
      this.reloadToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    delete(id):Promise<any> {
    let url = `${this.basePath}/api/eventosimgs/${id}`
      this.reloadToken();
      return this.http.delete(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    update(form):Promise<any> {
    let url = `${this.basePath}/api/vender/${form.id}`
      this.reloadToken();
      return this.http.put(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    getSingle(id:number):Promise<any> {
    let url = `${this.basePath}/api/eventosimgs/${id}`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

}
