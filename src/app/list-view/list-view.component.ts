import { comentario } from './../interfaces/comentario.interface';
import { gatos } from './../interfaces/gatos.interface';
import { Component } from '@angular/core';
import { enviroment } from '../config/enviroment';
import { RestService } from '../services/rest.service/rest.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent {
  public direccionDV = enviroment.production == false ? enviroment.urldev : enviroment.urlbase


  public datacomments: any
  public datagatos: any
  public contador: any
  public c_C: any = []

  constructor(private servicio: RestService) { }

  ngOnInit() {
    //this.cargarData();
    this.cargaDataQuest();
  }
  cargarData() {
    this.servicio.get(this.direccionDV + '/gatos').subscribe(data => {
      this.datagatos = data
      let greaterTen = [];
      for (let i = 0; i < this.datagatos.length; i++) {
        this.servicio.get(this.direccionDV + '/comentarios?id_from=' + this.datagatos[i].id).subscribe(comments => {
          this.datacomments = comments
          this.c_C.push({
            id_comentario: this.datagatos[i].id,
            title: this.datagatos[i].title,
            image: this.datagatos[i].image,
            cc: this.datacomments.length
          })
        })
  
      }
      console.log(this.c_C);
    })
  }

  cargaDataQuest(){
    this.servicio.get(this.direccionDV + '/gatos').subscribe(data => {
      this.datagatos = data //se obtienen el id normal
      //el id_from del comentario
      this.servicio.get(this.direccionDV + '/comentarios').subscribe(comments => {
        this.datacomments=comments
          for (let i = 0; i < this.datagatos.length; i++) {
            let cc = this.datacomments.filter((comentario: any)=> comentario.id_from === this.datagatos[i].id)
            this.c_C.push({
              id_comentario: this.datagatos[i].id,
              title: this.datagatos[i].title,
              image: this.datagatos[i].image,
              cc: cc.length
            })
          }
          console.log(this.c_C);
      })
    })
  }


}









