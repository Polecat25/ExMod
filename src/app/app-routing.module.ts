import { ListViewComponent } from './list-view/list-view.component';
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
  },
  {
    path: "listcom", component: ListViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
