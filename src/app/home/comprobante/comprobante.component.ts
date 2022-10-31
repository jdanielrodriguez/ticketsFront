import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Location } from '@angular/common';
import { EventosFuncionesAreaService } from "./../_services/eventos-funciones-area.service";
import { EventosVentasService } from "./../_services/eventos-ventas.service";
import {
  PayPalConfig, PayPalEnvironment, PayPalIntegrationType
} from 'ngx-paypal';

declare var $: any
declare var TCO: any
declare var hljs: any;
@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./comprobante.component.css']
})
export class ComprobanteComponent implements OnInit {
  dataSearch = {
    token:'',
    ern:''
  }
  public defaultPrice: string = '9.99';
  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  public payPalConfig ? : PayPalConfig;
  active = 1;
  enviados=false
  responseData=[]
  tCData = {
    sellerId: "901416066",//250351031026ordenes online
    publishableKey: "5141E4B3-8298-4808-B8B9-9FA6482D9E50",//BEFC3F1A-1B1D-4574-8F2D-89166D828845 ordenes online
    ccNo: "",//$("#ccNo").val(),
    cvv: "",//$("#cvv").val(),
    expMonth: "",//$("#expMonth").val(),
    expYear: ""//$("#expYear").val()
};
  comprobante = {
    token:'',
    aprobacion:'',
    fechaAprobacion:'',
    ern:''
  }
  @ViewChild('priceElem') priceElem?: ElementRef;
  idUser = localStorage.getItem('currentId');
  nombres = localStorage.getItem('currentNombres');
  apellidos = localStorage.getItem('currentApellidos');
  email = localStorage.getItem('currentEmail');
  SelectedData:any = null
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private route: ActivatedRoute,
    private _service: NotificationsService,
    private location: Location,
    private paidService: EventosVentasService,
    private mainService: EventosFuncionesAreaService,
    private router: Router,
  ) { }

  ngOnInit() {
    $('html, body').animate({scrollTop:0}, '300');
    this.getParams();
  }

  private initConfig(): void {
    console.log(this.SelectedData);

    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'AalFZZbA2kAOqv2eWPvQv2c71wORECzcoJ-Js4onMTF33B2bmc7zaMolh9iIdNqPRpn8NjHGsyr0RKAX'
      },
      button: {
        color:   'silver',
        shape:   'pill',
        size:'large',
        label:   'pay'
      },
      onPaymentComplete: async (data, actions) => {
        await this.insert()
        console.log('OnPaymentComplete');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: parseFloat(((this.SelectedData.totalAll-this.SelectedData.descuento)).toFixed(2))
        }
      }]
    });
  }
  getParams(){
    this.dataSearch.token = this.route.snapshot.paramMap.get("token");
    this.dataSearch.ern = this.route.snapshot.paramMap.get("ern");
    this.cargarComprobante(this.dataSearch)
  }

  cargarComprobante(dato:any){
    this.blockUI.start();

    let datos = localStorage.getItem('selectedSillas');
    if (datos) {
      this.SelectedData = JSON.parse(datos);
      this.initConfig();

      // localStorage.removeItem('selectedSillas');

    }
    // if(dato.token.length<5){
    //   this.router.navigate(['./../../../../checkout/'+this.SelectedData.id+':'+(this.SelectedData.eventos.titulo.replace(/ /g,'_'))+':0'])
    // }

    let data = {
      token:dato.token,
      ern:dato.ern
    }
    setTimeout(() => {
      this.blockUI.stop();

    }, 500);
      // this.paidService.comprobante(data)
      //                     .then(response => {
      //                       // console.log(this.SelectedData);
      //                       // console.log(response);
      //                         // this.comprobante = response;
      //                         if(response.status!=203){
      //                         // localStorage.removeItem('selectedSillas');
      //                         this.comprobante = response;
      //                         this.enviarEmail();
      //                         this.insert();
      //                       }else{
      //                         this.buscarSingle();
      //                       }
      //                       this.blockUI.stop();
      //                     }).catch(error => {
      //                       console.clear
      //                       this.blockUI.stop();
      //                       this.createError(error)
      //                       // console.log(error);
      //                       if(error.error){
      //                         if(error.error.message=="Compra Denegada"){
      //                           this.router.navigate(['./../../../../checkout/'+this.SelectedData.id+':'+(this.SelectedData.eventos.titulo.replace(/ /g,'_'))+':0'])
      //                         }
      //                       }
      //                     })
  }
  getToken(){
    this.blockUI.start();

    // Setup token request arguments
    var args = {
        sellerId: this.tCData.sellerId,
        publishableKey: this.tCData.publishableKey,
        ccNo: this.tCData.ccNo,//"4000000000000002",//$("#ccNo").val(),
        cvv: this.tCData.cvv,//"123",//$("#cvv").val(),
        expMonth: this.tCData.expMonth,//$("#expMonth").val(),
        expYear: this.tCData.expYear//$("#expYear").val()
    };
    TCO.loadPubKey('sandbox',
    // Make the token request
      data => {
        TCO.requestToken(response => {
            // var myForm = document.getElementById('myCCForm');
            let data = {
              token:response.response.token.token,
              price:this.SelectedData.totalAll-this.SelectedData.descuento,
              quantity:1,
              usuario:this.idUser

            }
            // console.log(response.response.token.token);
            // console.log(this.SelectedData);

            this.paidService.pago(data)
                            .then(async response2 => {
                              // console.log(response.response.token.token);
                              // console.log(response2);
                              this.dataSearch.token = response.response.token.token
                              this.dataSearch.ern = response2.result.response.transactionId
                              this.comprobante.ern = this.dataSearch.ern
                              this.comprobante.aprobacion = response2.result.response.orderNumber
                              this.comprobante.token = response.response.token.token
                              // console.log(this.dataSearch);

                              await this.insert()
                              this.blockUI.stop();

                            })
                            .catch(error => {
                              console.log(error);

                              this.blockUI.stop();

                            })
            // Set the token as the value for the token input
            // myForm.token.value = response.response.token.token;
        }, data => {
            if (data.errorCode === 200) {
                this.getToken();
            } else {
                console.log(data.errorMsg);
                this.blockUI.stop();
            }
        }, args)
      }
    );
  }

  getTokenQPP(){
    this.blockUI.start();
    // Setup token request arguments
    let data = {
      x_login: "visanetgt_qpay",
      x_private_key: "88888888888",
      x_api_secret: "99999999999",
      x_product_id: "1",
      x_audit_number: "20",
      x_fp_sequence: "20",
      x_fp_timestamp: "154681351",
      x_invoice_num: "001",
      x_currency_code: "GTQ",
      x_amount: this.SelectedData.totalAll-this.SelectedData.descuento,
      x_line_item: "T-Shirt Live Dreams<|>w01<|><|>1<|>85.00<|>N",
      x_freight: "0",
      x_email: "email@tuempresa.com",
      cc_number: this.tCData.ccNo,
      cc_exp: this.tCData.expMonth+"/"+this.tCData.expYear,
      cc_cvv2: this.tCData.cvv,
      cc_name: "Pedro Quino",
      x_first_name: "Pedro",
      x_last_name: "Quino",
      x_company: "1234567-8",
      x_address: "1 calle 2 ave",
      x_city: "Guatemala",
      x_state: "Guatemala",
      x_country: "Guatemala",
      x_zip: "01011",
      x_relay_response: "none",
      x_relay_url: "none",
      x_type: "AUTH_ONLY",
      x_method: "CC",
      http_origin: "tuempresa.com",
      cc_type: 'visa',
      visaencuotas: 0,
    };
    this.paidService.qpago(data)
                    .then(async response => {
                      console.log(response);
                      if(response.responseCode==100){
                        this.dataSearch.token = response.responseCode
                        this.dataSearch.ern = response.responseAuthorization
                        this.comprobante.ern = this.dataSearch.ern
                        this.comprobante.aprobacion = response.idTransaction
                        this.comprobante.token = response.responseAuthorization
                        await this.insert()
                        this.blockUI.stop();
                      }
                      this.blockUI.stop();
                    })
                    .catch(error => {
                      console.log(error);
                      this.blockUI.stop();
                    })

  }

  getTokenPagalo(){
    this.blockUI.start();
    // Setup token request arguments
    let tcToken ={
      nameCard:"Jhon Peter",
      accountNumber:this.tCData.ccNo,
      expirationMonth:this.tCData.expMonth,
      expirationYear:this.tCData.expYear,
      CVVCard:this.tCData.cvv
    }

    let data = {
      cantidad:1,
      precio:this.SelectedData.totalAll-this.SelectedData.descuento,
      tcToken:btoa(JSON.stringify(tcToken))
    };
    this.paidService.pagalo(data)
                    .then(async response => {
                      console.log(response);
                      if(response.responseCode==100){
                        this.dataSearch.token = response.responseCode
                        this.dataSearch.ern = response.responseAuthorization
                        this.comprobante.ern = this.dataSearch.ern
                        this.comprobante.aprobacion = response.idTransaction
                        this.comprobante.token = response.responseAuthorization
                        await this.insert()
                        this.blockUI.stop();
                      }
                      this.blockUI.stop();
                    })
                    .catch(error => {
                      console.log(error);
                      this.blockUI.stop();
                    })

  }

  insert(){
      // localStorage.removeItem('selectedSillas');
      // let response1 = []
      this.blockUI.start();
      if(this.SelectedData){
        this.SelectedData.lugares.forEach(async element => {
          let data = {
            cantidad: this.SelectedData.lugares.length,
            precio: this.SelectedData.precio,
            descripcion: element.descripcion,
            url: "paid/"+this.dataSearch.token+"/"+this.dataSearch.ern,
            titulo : element.titulo,
            lugar : 'lugar',
            fechaAprobacion : this.comprobante.fechaAprobacion,
            fechaAprobacionS : this.comprobante.fechaAprobacion,
            aprobacion : this.comprobante.aprobacion,
            token : this.dataSearch.token,
            ern : this.dataSearch.ern,
            codigo : element.eventos.eventos.eventos.usuarios.codigo,
            total : this.SelectedData.totalAll-this.SelectedData.descuento,
            latitud : this.SelectedData.eventos.latitud,
            longitud : this.SelectedData.eventos.longitud,
            usuario : this.idUser,
            evento : element.eventos.eventos.evento,
            evento_funcion : element.eventos.evento_funcion,
            evento_funcion_area_lugar : element.id,
            evento_vendedor : this.SelectedData.evento_vendedor?this.SelectedData.evento_vendedor:null,
            evento_descuento : null
          }

          await this.paidService.create(data)
                              .then(async response => {
                                await this.responseData.push(response);
                                // this.blockUI.stop();

                                  // console.log("data",data);
                                  // console.log("response",response);
                              }).catch(error => {
                                console.clear
                                this.blockUI.stop();
                                this.createError(error)
                              })
        });

        this.mainService.vender(this.SelectedData)
                            .then(async response => {
                              this.blockUI.stop();
                              localStorage.removeItem('selectedSillas');
                              this.createSuccess("Su compra fue exitosa, se le redireccionara a su dashboard en un momento")
                              await this.enviarEmail();


                                // console.log("data",data);
                                // console.log("response",response);

                            }).catch(error => {
                              console.clear
                              this.blockUI.stop();
                              this.createError(error)
                            })
        // console.log(this.responseData);
      }else{
        this.blockUI.stop();
        this.createError("Lo sentimos, tu orden no pudo ser procesada")
        this.router.navigate(['./../../../../dashboard/home'])

      }



  }
  enviarEmail(){
    this.blockUI.start();
    let data = {
      nombres:this.nombres,
      apellidos:this.apellidos,
      email:this.email,
      SelectedData:this.SelectedData,
      comprobante:this.comprobante
    }
    this.paidService.enviar(data)
                  .then(response => {
                    this.createSuccess("Su comprobante ha sido enviado");
                    this.enviados=false
                    setTimeout(() => {
                      this.router.navigate(['./../../../../dashboard/home'])

                    }, 5000);
                    this.blockUI.stop();
                  }).catch(error => {
                    console.clear
                    this.blockUI.stop();
                    this.enviados=true
                    this.createError("Ha ocurrido un error enviando su comprobante, por favor de click al boton enviar para intentar otra vez.")
                  })
  }

  add(){
    let seleccionados = []
    this.SelectedData.lugares.forEach(element => {
      if(element.selected){
        seleccionados.push(element)
      }
    });
    if(seleccionados.length>0){
      this.SelectedData.totalAll = this.SelectedData.precio*(seleccionados.length)

    }
  }
  goBack(){
    this.location.back();
  }
  buscarSingle(){
    this.blockUI.start();
    let data = {
      id:this.dataSearch.token,
      state:this.dataSearch.ern,
      filter:'token'
    }
      this.paidService.getAllFilter(data)
                          .then(response => {
                            this.blockUI.stop();
                            let data = {
                              area : 0,
                              lugar :[]
                            }
                            let lugares = []
                            response.forEach(element => {
                              lugares.push(element.area)
                              data = {
                                area : element.area.evento_funcion_area,
                                lugar : lugares
                              }
                            });
                            // this.cargarAreas(data)

                            // this.cargarFunciones(response.evento);
                            // this.cargarAreas(response.id);
                            // this.cargarSingle(response.id);
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }

  cargarAreas(other:any){
    this.blockUI.start();
    let data = {
      id:0,
      state:other.area,
      filter:'evento_funcion'
    }
      this.mainService.getSingle(other.area)
                          .then(response => {
                            console.log(response);
                            response.lugares =other.lugar
                            this.SelectedData = response
                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }

  cargarFunciones(id:number){
    this.blockUI.start();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, '0');
    let MM = String(today.getMinutes()).padStart(2, '0'); //January is 0!
    let ss = String(today.getSeconds()).padStart(2, '0'); //January is 0!
    let stoday = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss;
    let data = {
      id:id,
      state:stoday,
      filter:'proximos_eventos'
    }
      this.mainService.getAllFilter(data)
                          .then(response => {
                            console.log(response);

                            this.blockUI.stop();
                          }).catch(error => {
                            console.clear
                            this.blockUI.stop();
                            this.createError(error)
                          })
  }
  navegar(url:string,id?:number){
    localStorage.removeItem('lastLinkUrl')
    if (!localStorage.getItem('currentUser')) {
      localStorage.setItem('lastLinkUrl',url);
      $('#loginTemplate').removeClass('container');
      $('#generalModalDetalle').modal("show");
    }else{
      this.router.navigate([url])
    }
  }
  collapse(str:string){
    if($('#'+str).collapse("show")){
      $('#'+str).collapse("hide")

    }else{
      $('#'+str).collapse("show")

    }
  }
  public options = {
    position: ["bottom", "right"],
    timeOut: 2000,
    lastOnBottom: false,
    animate: "scale",
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };

  createSuccess(success) {
    this._service.success('¡Éxito!',success)
  }
  createError(error) {
    this._service.error('¡Error!',error)
  }

}
