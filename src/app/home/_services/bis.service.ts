import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { path } from "../../config.module";

// // import "rxjs/add/operator/toPromise";

@Injectable({
providedIn: 'root',
})
export class BisService {

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
        'Content-Type' : 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + this.token});
    }

    getAll():Promise<any> {
      let url = `${this.basePath}/bis`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllMine(data:any):Promise<any> {
      let url = `${this.basePath}/bisusuario/${data.id}/active?tipo=${data.tipo}`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getAllMineDraft(data:any):Promise<any> {
      let url = `${this.basePath}/bisusuario/${data.id}/draft?tipo=${data.tipo}`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getTop(data:any):Promise<any> {
      this.reloadToken();
      let url = `${this.basePath}/topbis?limit=${data.limit}&tipo=${data.tipo}`
        return this.http.get(url)
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
    }
    getFaqs(id:number):Promise<any> {
      this.reloadToken();
      let url = `${this.basePath}/bisfaq?bisId=${id}`
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getFind(data:any):Promise<any> {
      this.reloadToken();
      let params = "?";
      data.tipo?params+=`tipo=${data.tipo}&`:params+='';
      data.search?params+=`search=${data.search}&`:params+='';
      data.gt?params+=`gt=${data.gt}&`:params+='';
      data.lt?params+=`lt=${data.lt}&`:params+='';
      data.category?params+=`category=${data.category}&`:params+='';
      data.subcategory?params+=`subcategory=${data.subcategory}&`:params+='';
      params = params.substring(0,params.length-1)
      let url = `${this.basePath}/findbis${params}`
      // console.log(url);
      return this.http.get(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getMineFAQS(id):Promise<any> {
      let params = "?";
      id?params+=`bisId=${id}&`:params+='';
      params = params.substring(0,params.length-1)
      let url = `${this.basePath}/bisfaq${params}`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getMineREQS(id):Promise<any> {
      let params = "?";
      id?params+=`bisId=${id}&`:params+='';
      params = params.substring(0,params.length-1)
      let url = `${this.basePath}/requerimientos${params}`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }


    create(form):Promise<any> {
      let url = `${this.basePath}/bis`
      // console.log(form);
      // console.log(this.token);
      this.reloadToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    createFAQ(form):Promise<any> {
      let url = `${this.basePath}/bisfaq`
      this.reloadToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    createREQ(form):Promise<any> {
      let url = `${this.basePath}/requerimientos`
      this.reloadToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    upload(form):Promise<any> {
      let url = `${this.basePath}/upload`
      this.reloadToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    uploadIMG(form):Promise<any> {
      let url = `${this.basePath}/imagenesbis`
      this.reloadToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    uploadFILE(form):Promise<any> {
      let url = `${this.basePath}/archivosbis`
      this.reloadToken();
      return this.http.post(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    delete(id):Promise<any> {
    let url = `${this.basePath}/bis/${id}`
      this.reloadToken();
      return this.http.delete(url)
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    deleteIMG(id):Promise<any> {
    let url = `${this.basePath}/imagenesbis/${id}`
      this.reloadToken();
      return this.http.delete(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    deleteFILE(id):Promise<any> {
    let url = `${this.basePath}/archivosbis/${id}`
      this.reloadToken();
      return this.http.delete(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    update(form):Promise<any> {
      let url = `${this.basePath}/bis/${form.id}`
      // console.log(form);
      this.reloadToken();
      return this.http.put(url,form,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getSingle(id:number):Promise<any> {
      // console.log(this.token);
      let url = `${this.basePath}/getbis/${id}`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getSingleMine(data:any):Promise<any> {
      let url = `${this.basePath}/mine/${data.solicitanteId}/bis/${data.id}`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response;)
                          return response;
                        })
                        .catch(this.handleError)
    }

    getSingleMines(data:any):Promise<any> {
      let url = `${this.basePath}/mines/${data.solicitanteId}/bis/${data.id}`
      this.reloadToken();
      return this.http.get(url,{headers: this.headers})
                      .toPromise()
                        .then(response => {
                          //console.log(response.json())
                          return response
                        })
                        .catch(this.handleError)
    }

    getSingleRequest(data:any):Promise<any> {
      this.reloadToken();
      let url = `${this.basePath}/cotizaciones/proformas/${data.proformaId}`
        return this.http.get(url,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }

    getSingleBis(data:any):Promise<any> {
      this.reloadToken();
      let url = `${this.basePath}/proformas/cotizaciones/${data.proformaId}`
        return this.http.get(url,{headers: this.headers})
                        .toPromise()
                          .then(response => {
                            //console.log(response;)
                            return response;
                          })
                          .catch(this.handleError)
      }

}
