import { RestService } from './../services/rest.service/rest.service';
import { gatos } from './../interfaces/gatos.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-view',
  templateUrl: './detalle-view.component.html',
  styleUrls: ['./detalle-view.component.css']
})
export class DetalleViewComponent implements OnInit {
constructor (private router: ActivatedRoute, private servicio: RestService){}
public respuesta!:gatos
  ngOnInit(): void {

  this.router.paramMap.subscribe((paramsMap:any) =>{
    const {params} = paramsMap
    console.log("parametro: ", params.id);
    this.cargarData(params.id)
  } )
}
cargarData(id:string){
  this.servicio.get("http://localhost:3000/gatos/"+id).subscribe((data:gatos)=>{
      this.respuesta= data
      console.log("data: ", this.respuesta);
      
  })
}
}
