import { RestService } from './../services/rest.service/rest.service';
import { gatos } from './../interfaces/gatos.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';
import { comentario } from '../interfaces/comentario.interface';

@Component({
  selector: 'app-detalle-view',
  templateUrl: './detalle-view.component.html',
  styleUrls: ['./detalle-view.component.css']
})
export class DetalleViewComponent implements OnInit {


constructor (private router: ActivatedRoute, private servicio: RestService, private fb:FormBuilder){}

hoy =  moment(Date.now()).format("YYYY-MM-DD hh:mm A")
public respuesta:gatos = {
  id: 0,
  title: '',
  subtitle: '',
  image: '',
  autor: {nombre:'', año:0}

}
public comentarios_:comentario | any
public form!:FormGroup;

  ngOnInit(): void {
   
this.form= this.fb.group({  
  comentario: ['', Validators.required],
})
//console.log("fecha de hoy: ", this.hoy);
//PARA CARGAR LOS DATOS DEL DETALL 
  this.router.paramMap.subscribe((paramsMap:any) =>{
    const {params} = paramsMap
    console.log("parametro: ", params.id);
    this.cargarData(params.id)
  } )
}

cargarData(id:string){
  this.servicio.get("http://localhost:3000/gatos/"+id).subscribe((data:gatos)=>{
      this.respuesta = data
      console.log("data: ", this.respuesta);
      
  });
  
  this.servicio.get('http://localhost:3000/comentarios?id_from='+id).subscribe((comentarios:any)=>{
  this.comentarios_=comentarios
  })
}

enviardata(){

  const body:comentario = {
      id_from: this.respuesta.id.toString(),
      contenido: this.form.value.comentario,
      fecha: this.hoy
  }
  this.servicio.post('http://localhost:3000/comentarios', body).subscribe(res=>{
    //console.log("enviado");
    //this.cargarData(this.respuesta.id.toString())
    this.form.reset();
    this.comentarios_.push(body) //push al array de lso comentarios, que esta local
  })
}
}
