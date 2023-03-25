import { ServicioMultiService } from './../services/servicio-multi.service';
import { RestService } from './../services/rest.service/rest.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AfterContentInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public galleta:any 
  public usuario:any =[]
  constructor(private servicio: ServicioMultiService, private cookie: CookieService, private route: Router ){}
ngOnInit() {
  let data =  localStorage.getItem('usr') || '{}'
  this.usuario = JSON.parse(data)  
  
 console.log("esto", this.usuario);
 this.galleta = this.cookie.get('access_token')

}


logOutt(){
 
  this.cookie.deleteAll()
  window.location.reload();
  localStorage.clear()
}
}
