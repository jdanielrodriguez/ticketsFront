import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styles: []
})
export class ToolsComponent implements OnInit {
  toolsList = [
    {
      "name": "Cotizador Formato 1",
      "description": "Formato de cotización.",
      "url": "https://s3.amazonaws.com/bishound-cdn-bucket/tools/Cotizador_Formato_1.xls",
      "type": "fa fa-file-excel-o"
    },
    {
      "name": "Cotizador Formato 2",
      "description": "Formato de cotización.",
      "url": "https://s3.amazonaws.com/bishound-cdn-bucket/tools/Cotizador_Formato_2.xls",
      "type": "fa fa-file-excel-o"
    },
    {
      "name": "Plantilla Lienzo Canvas",
      "description": "Plantilla de gestión estratégica para el desarrollo de nuevos modelos de negocio o documentar los ya existentes.",
      "url": "https://s3.amazonaws.com/bishound-cdn-bucket/tools/Plantilla_Lienzo_Canvas.doc",
      "type": "fa fa-file-word-o"
    },    
    {
      "name": "Formato de KPIs",
      "description": "Indicadores clave en el desempeño del negocio que nos permite medir el éxito de nuestras acciones, el cual Puede expresarse en términos monetarios, de unidades o en porcentajes.",
      "url": "https://s3.amazonaws.com/bishound-cdn-bucket/tools/FormatoKPIS.xls",
      "type": "fa fa-file-excel-o"
    },
    {
      "name": "Formato de Ventas Mensuales",
      "description": "Un formato elaborado para monitorear el crecimiento de ventas de servicios o productos. Este formato permite dividir los objetivos por meses y tipos de objetivos esperados.",
      "url": "https://s3.amazonaws.com/bishound-cdn-bucket/tools/Formato_Ventas_Mensuales.xlsx",
      "type": "fa fa-file-excel-o"
    },
    {
      "name": "Formato Plan Operativo",
      "description": "Un plan operativo es un documento oficial en el que los responsables de una organización o un fragmento del mismo enumeran los objetivos y las directrices que deben cumplir en el corto plazo.",
      "url": "https://s3.amazonaws.com/bishound-cdn-bucket/tools/Formato_Plan_Operativo_(POA).xls",
      "type": "fa fa-file-excel-o"
    },
    {
      "name": "Formato Mensual de Resultados",
      "description": "Un reporte de resultados apoya con el desarrollo del POA por medio de una medición mensual.",
      "url": "https://s3.amazonaws.com/bishound-cdn-bucket/tools/Formato_Mensual_de_Resultados+.xls",
      "type": "fa fa-file-excel-o"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
