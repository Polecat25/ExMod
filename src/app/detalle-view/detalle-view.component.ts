import { RestService } from './../services/rest.service/rest.service';
import { gatos } from './../interfaces/gatos.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { comentario } from '../interfaces/comentario.interface';
import { enviroment } from '../config/enviroment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalle-view',
  templateUrl: './detalle-view.component.html',
  styleUrls: ['./detalle-view.component.css']
})
export class DetalleViewComponent implements OnInit {

  public direccionDV =  enviroment.production==false? enviroment.urldev : enviroment.urlbase 
constructor (private router: ActivatedRoute, private servicio: RestService, private fb:FormBuilder){}

//hoy =  moment(Date.now()).format("YYYY-MM-DD hh:mm A")
public respuesta:gatos = {
  id: '',
  title: '',
  subtitle: '',
  image: '',
  autor: {nombre:'', año:0}

}

pipe = new DatePipe('en-US');
hoy = this.pipe.transform(Date.now(), 'dd-MM-YYYY hh:mm a') || "";

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
  this.servicio.get(this.direccionDV+"/gatos/"+id).subscribe((data:gatos)=>{
      this.respuesta = data
      console.log("data: ", this.respuesta);
      
  });
  
  this.servicio.get(this.direccionDV+'/comentarios?id_from='+id).subscribe((comentarios:any)=>{
  this.comentarios_=comentarios
  })
}

enviardata(){

  const body = {
      id_from: this.respuesta.id,
      contenido: this.form.value.comentario,
      fecha: this.hoy?.toString()
  }
  this.servicio.post(this.direccionDV+'/comentarios', body).subscribe(res=>{
    //console.log("enviado");
    //this.cargarData(this.respuesta.id.toString())
    this.form.reset();
    this.comentarios_.push(body) //push al array de lso comentarios, que esta local
  })
}
}
