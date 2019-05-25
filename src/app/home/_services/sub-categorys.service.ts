import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
providedIn: 'root',
})
export class SubCategorysService {

	headers = new HttpHeaders({
    'Content-Type' : 'application/json; charset=UTF-8'})
private basePath:string = path.path
private token = '';

constructor(private http:HttpClient){
  this.reloadToken()
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
    let url = `${this.basePath}/subcategorias`
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllParent(id:number):Promise<any> {
      let url = `${this.basePath}/findsubcategories?category=${id}`
        return this.http.get(url)
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }

    create(form):Promise<any> {
    let url = `${this.basePath}/subcategorias`
      return this.http.post(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    delete(id):Promise<any> {
    let url = `${this.basePath}/subcategorias/${id}`
      return this.http.delete(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    update(form):Promise<any> {
    let url = `${this.basePath}/subcategorias/${form.id}`
      return this.http.put(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getSingle(id:number):Promise<any> {
    let url = `${this.basePath}/subcategorias/${id}`
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

}

