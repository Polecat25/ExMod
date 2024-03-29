import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from "@angular/common/http";
import { DetalleViewComponent } from './detalle-view/detalle-view.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListViewComponent } from './list-view/list-view.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CardComponent,
    HeaderComponent,
    DetalleViewComponent,
    HomeComponent,
    ListViewComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
        
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
