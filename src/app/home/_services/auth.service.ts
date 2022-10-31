import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "./../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
providedIn: 'root',
})
export class AuthServices {
  	headers = new HttpHeaders({
      'Content-Type' : 'application/json; charset=UTF-8'})
  private basePath:string = path.path

  private token = '';
  url;
  constructor(private http:HttpClient){

  this.reloadToken();

  }
  Savesresponse(responce)
      {
        this.url =  'http://localhost:64726/Api/Login/Savesresponse';
        let url = `${this.basePath}/api/login`
        return this.http.post(url,responce);

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
  return Promise.reject(error)
  }

  Authentication(login:any):Promise<any> {
    let url = `${this.basePath}/api/login`

    this.reloadToken();
    return this.http.post(url,login)
                    .toPromise()
                    .then(response => {
                      // console.log(response.json())
                      return response;
                    })
                    .catch(this.handleError)
  }

  logout(login:any):Promise<any> {
    let url = `${this.basePath}/api/logout`

    this.reloadToken();
    return this.http.post(url,login)
                    .toPromise()
                    .then(response => {
                      // console.log(response.json())
                      return response;
                    })
                    .catch(this.handleError)
  }

  recovery(form:any):Promise<any>{
    let url = `${this.basePath}/api/users/password/reset`

    this.reloadToken();
    return this.http.post(url,form)
                      .toPromise()
                      .then(response => {
                        return response;
                      })
                      .catch(this.handleError)
  }

  updatePass(form):Promise<any> {
    let url = `${this.basePath}/api/users/${form.id}/changepassword`

      return this.http.post(url,form)
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response
                        })
                        .catch(this.handleError)
    }

}
