import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// import "rxjs/add/operator/toPromise";

@Injectable({
  providedIn: 'root'
})
export class EventosVentasService {
	headers = new HttpHeaders({'Access-Control-Allow-Origin':'*',
  'cache-control':'no-cache',
  'server':'Apache/2.4.18 (Ubuntu)',
  'x-ratelimit-limit':'60',
  'x-ratelimit-remaining':'59'})
private basePath:string = path.path

constructor(private http:HttpClient){
  this.getToken()
}
private token = '';

getToken(token?){

  let datos = localStorage.getItem('token');
    if(datos){
      this.token = (datos);
    }else{
      this.token = token?token:path.token
    }
  this.headers.append('Content-Type', 'application/json');
  this.headers.append('Authorization', 'Bearer ' + this.token );
}

private handleError(error:any):Promise<any> {
console.error("ha ocurrido un error")
console.log(error)
return Promise.reject(error)
}

    getAll():Promise<any> {
    let url = `${this.basePath}/api/eventosventa`
      this.getToken();
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
    let url = `${this.basePath}/api/filter/${data.id}/eventosventa/${data.state}${filter}`
      this.getToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }


    create(form):Promise<any> {
    let url = `${this.basePath}/api/eventosventa`
      this.getToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }


    pagar(form):Promise<any> {
      form.SANDBOX = true;
    let url = `${this.basePath}/api/pagar`
      this.getToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    pago(form):Promise<any> {
    let url = `${this.basePath}/api/pago`
      this.getToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }



    qpago(form):Promise<any> {
      let url = `${this.basePath}/api/qpago`
        this.getToken();
        return this.http.post(url,form,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response)
                            return response
                          })
                          .catch(this.handleError)
      }



    pagalo(form):Promise<any> {
      let url = `${this.basePath}/api/pagalo`
        this.getToken();
        return this.http.post(url,form,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response)
                            return response
                          })
                          .catch(this.handleError)
      }


    enviar(form):Promise<any> {
      let url = `${this.basePath}/api/enviar`
        this.getToken();
        return this.http.post(url,form,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response)
                            return response
                          })
                          .catch(this.handleError)
      }


    comprobante(form):Promise<any> {
    let url = `${this.basePath}/api/comprobante`
      this.getToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    delete(id):Promise<any> {
    let url = `${this.basePath}/api/eventosventa/${id}`
      this.getToken();
      return this.http.delete(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    update(form):Promise<any> {
    let url = `${this.basePath}/api/eventosventa/${form.id}`
      this.getToken();
      return this.http.put(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

    getSingle(id:number):Promise<any> {
    let url = `${this.basePath}/api/eventosventa/${id}`
      this.getToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response)
                          return response
                        })
                        .catch(this.handleError)
    }

}
