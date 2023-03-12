import { gatos } from './../interfaces/gatos.interface';
import { Component , OnInit} from '@angular/core';
import { ServicioMultiService } from '../services/servicio-multi.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  constructor (private favoritos:ServicioMultiService){}

  public ListaFavs:Array<gatos>=[]
 ngOnInit():void{
  this.favoritos.disparadorFavoritos.subscribe(data =>{
      console.log("data desde el card:  ", data); 
      this.ListaFavs.push(data)     
  })
 }
  
}
