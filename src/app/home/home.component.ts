import { Component, OnInit } from '@angular/core';
import { enviroment } from '../config/enviroment';
import { RestService } from '../services/rest.service/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public direccionDV =  enviroment.production==false? enviroment.urldev : enviroment.urlbase 
  constructor(private rest: RestService){}
  public cards :any=[]
    ngOnInit(): void {    
    this.cargardata()
      
    }
  
    public cargardata(){
      this.rest.get(this.direccionDV+"/gatos").subscribe(data=>{      
      this.cards = data
      //console.log("data de server json: ", this.cards);
    })
    }
}
