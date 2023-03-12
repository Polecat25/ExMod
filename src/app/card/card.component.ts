import { ServicioMultiService } from './../services/servicio-multi.service';
import { Component, Input } from '@angular/core';
import { gatos } from '../interfaces/gatos.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() DataEntrante!: gatos;
  constructor (private favoritos:ServicioMultiService){}
  agregarData(){
    //var sd = this.DataEntrante
  /* this.DataEntrante={
    id: this.DataEntrante.id, 
    title: this.DataEntrante.title, 
    subtitle:this.DataEntrante.subtitle, 
    image: this.DataEntrante.image,
    autor:{
      nombre:this.DataEntrante.autor.nombre,
      año:this.DataEntrante.autor.año
    }
  } */
 //   console.log(this.DataEntrante);
    this.favoritos.disparadorFavoritos.emit(this.DataEntrante)
    console.log("UWU: ", this.DataEntrante);
    
  }
}
