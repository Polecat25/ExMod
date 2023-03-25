import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RestService } from '../services/rest.service/rest.service';
import { ServicioMultiService } from '../services/servicio-multi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private cookie: CookieService, public fb: FormBuilder, private router: Router, private emiter: ServicioMultiService, private servicio: RestService){}

  public registerForm!:FormGroup 

  ngOnInit(): void {
    this.registerForm= this.fb.group({
      user: [null, [Validators.required, Validators.minLength(3)]],
      pass: [null, [Validators.required, Validators.minLength(3)]],
      terms: ['',[Validators.required, Validators.requiredTrue]]
    }) 
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
        user:this.registerForm.value.user,
        pass:this.registerForm.value.pass,
      },
      signature:
      {
        secreto: "misecreto"
      }
    }
  
    try {
     //REGISTRO XD 
    this.servicio.get('/users/?user='+jwt_imaginario.payload.user).subscribe(respuesta =>{
      console.log("es true? ", respuesta);
      if (respuesta.length>0) {
        console.log("usuario ya registrada");       
        alert('Already take') 
          
      } else{
        this.procesado(jwt_imaginario)
      }
      
      
      
    })
    

    
    
    
    
    } catch (error) {
      return error
    }
  
   
  }


  procesado(jwt_imaginario:any){
    this.hash(jwt_imaginario.header).then(headerREs =>{
      let headerHash = headerREs
      let payloadHash: string
      let sigantureHash: string 
      let token: string
      
      this.hash(jwt_imaginario.payload).then(payloadRes =>{ 
        
        payloadHash = payloadRes
        this.hash(jwt_imaginario.signature).then(sigRes =>{
            sigantureHash = sigRes
            token = headerHash +'.'+payloadHash+'.'+sigantureHash    

            this.servicio.getUser_simulation('/users', {...jwt_imaginario.payload, token}).subscribe((respuesta: any) =>{
             
             
              //esto es redundandate pero es una peticion que se le deve hacer al api para saber si la cookie en verdad pertence al usuario
              this.servicio.get('/users?token='+respuesta.token).subscribe(token =>{
                
                  if (token[0].token) {             
                                          
                    this.hash(token[0].token).then(newtoken4Payload =>{
                    //  console.log("--->4", newtoken4Payload);
                      const Newtoken =  headerHash +'.'+newtoken4Payload+'.'+sigantureHash
                      this.servicio.put('/users/'+token[0].id, {...jwt_imaginario.payload, token:Newtoken}).subscribe(res =>{
                        //this.cookie.set('access_token', Newtoken)   
                       // console.log("registro: ", res);
                        alert(':) Now you can Login')
                        //localStorage.setItem('usr', JSON.stringify(res))//TODO: porque no hay metodo de verificacion de cuenta
                        this.router.navigate(['/login'])
                      })
                    })
                  }
              })
             

              
            })
        })
       
                
      })
      
    })
  }
}
