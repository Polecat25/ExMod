import { HomeComponent } from './home/home.component';
import { DetalleViewComponent } from './detalle-view/detalle-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "post/:id", component: DetalleViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
