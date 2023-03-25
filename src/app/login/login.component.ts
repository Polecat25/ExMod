import { ServicioMultiService } from './../services/servicio-multi.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from './../services/rest.service/rest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
constructor(public fb: FormBuilder, private emiter: ServicioMultiService, private router: Router, private servicio: RestService, private Cookie: CookieService){}

public loginForm!:FormGroup 

ngOnInit(){
  this.loginForm= this.fb.group({
    user: [null, [Validators.required, Validators.minLength(3)]],
    pass: [null, [Validators.required, Validators.minLength(3)]],
    //terms: ['',[Validators.required, Validators.requiredTrue]]
  }) 
  //this.simulacroCarga_toinputs() 
}
 hash(VALOR: any ) {
  const utf8 = new TextEncoder().encode(JSON.stringify(VALOR));
  return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  });
}
  
sendDataREGISTRO(){
  const jwt_imaginario = {
    header: 
    {
      "alg": "HS256",
      "typ": "JWT"
    },
    payload:
    {
      user:this.loginForm.value.user,
      pass:this.loginForm.value.pass,
    },
    signature:
    {
      secreto: "misecreto"
    }
  }
  
  //REGISTRO XD
    this.hash(jwt_imaginario.header).then(headerREs =>{
      let headerHash = headerREs
      let payloadHash: string
      let sigantureHash: string 
      let token: string
      
      this.hash(jwt_imaginario.payload).then(payloadRes =>{
        console.log("payload",jwt_imaginario.payload);
        
        payloadHash = payloadRes
        this.hash(jwt_imaginario.signature).then(sigRes =>{
            sigantureHash = sigRes
            token = headerHash +'.'+payloadHash+'.'+sigantureHash
            console.log("token bb: "+token);

            this.servicio.getUser_simulation('/users', {...jwt_imaginario.payload, token}).subscribe((respuesta: any) =>{
              console.log("respons3e: ", respuesta);
              
            })
        })
       
        //token = passHash +'.'+userHash             
      })
      
    })

 
}

sendData(){
  this.servicio.get('/users?user='+this.loginForm.value.user+'&pass='+this.loginForm.value.pass).subscribe(data=>{
    if (data.length ===0) {
      throw new Error("no es usr");      
    }

    let usr = {id: data[0].id, user: data[0].user}

    localStorage.setItem('usr', JSON.stringify(usr))
     
    this.Cookie.set('access_token', data[0].token, 1, '/') //parametros: nombre de cookie, su contenido, cuando expira, y para que rutas sera valida
    this.router.navigate(['/'])
    
    console.log("sus datos: ", usr);

  })
}
simulacroCarga_toinputs(){
  const data={
    user: "elmago",
    pass: "12345",
    terms: true
  }

  this.loginForm.patchValue({
    user: data.user,
    pass: data.pass,
    terms: data.terms
  })
}

}
