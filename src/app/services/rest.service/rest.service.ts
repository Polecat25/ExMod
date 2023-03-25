import { gatos } from './../../interfaces/gatos.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/app/config/enviroment';

@Injectable({
  providedIn: 'root'
})

/*SE DEBE IMPORTAR EL HTTP CLIENT MODULE en el app.client PARA USAR EL SISTEMA DE CONSUMO DE METODOS HTTP ()CONSUMO DE APIS) */
export class RestService {
  private direccionDV = enviroment.production == false ? enviroment.urldev : enviroment.urlbase
  public dataUser:any
  constructor(private http: HttpClient) { }
  get(url:string){
    return this.http.get<any>(this.direccionDV+ url)
  }
  post(url:string, body:any){
    return this.http.post(this.direccionDV+url, body)
  }
  put(url:string, body:any){
    return this.http.put(this.direccionDV+url, body)
  }

  //SIMULACRO DE PRUEBAS DE LOGIN / REGISTRO 
  
   getUser_simulation(url:string, body:any){
    return this.http.post(this.direccionDV+url, body)
  }

  
}



  