import { gatos } from './../../interfaces/gatos.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/*SE DEBE IMPORTAR EL HTTP CLIENT MODULE en el app.client PARA USAR EL SISTEMA DE CONSUMO DE METODOS HTTP ()CONSUMO DE APIS) */
export class RestService {

  constructor(private http: HttpClient) { }
  get(url:string){
    return this.http.get<gatos>(url)
  }
}
