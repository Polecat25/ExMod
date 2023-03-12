import { EventEmitter, Injectable, Output } from '@angular/core';
import { gatos } from '../interfaces/gatos.interface';

@Injectable({
  providedIn: 'root'
})
//los servicios se imnportan en el construnctor donde se necesiten
export class ServicioMultiService {
@Output() disparadorFavoritos: EventEmitter<gatos> = new EventEmitter() 
  constructor() { }
}
