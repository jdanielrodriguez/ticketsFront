import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
providedIn: 'root',
})
export class OrdersService {
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
    let url = `${this.basePath}/ordenes`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllBuyersOrders(id):Promise<any> {
    let url = `${this.basePath}/buyers/ordenes/${id}`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllBuyersDeliveredOrders(id):Promise<any> {
    let url = `${this.basePath}/buyers/delivered/ordenes/${id}`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllBuyersCompletedOrders(id):Promise<any> {
    let url = `${this.basePath}/buyers/completed/ordenes/${id}`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllBuyersCanceledOrders(id):Promise<any> {
    let url = `${this.basePath}/buyers/canceled/ordenes/${id}`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllSellersOrders(id):Promise<any> {
    let url = `${this.basePath}/sellers/ordenes/${id}`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllSellersDeliveredOrders(id):Promise<any> {
    let url = `${this.basePath}/sellers/delivered/ordenes/${id}`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllSellersCompletedOrders(id):Promise<any> {
    let url = `${this.basePath}/sellers/completed/ordenes/${id}`
      this.reloadToken()
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllSellersCanceledOrders(id):Promise<any> {
    let url = `${this.basePath}/sellers/canceled/ordenes/${id}`
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
    let url = `${this.basePath}/ordenes`
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
    let url = `${this.basePath}/ordenes/${id}`
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
    let url = `${this.basePath}/ordenes/${form.id}`
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
    let url = `${this.basePath}/ordenes/${id}`
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
