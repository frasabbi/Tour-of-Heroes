import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HeroesComponent } from "./heroes/heroes.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";

const routes:Routes =[
  {path:'', redirectTo:'/dashboard',pathMatch:'full'},
  {path:'heroes', component:HeroesComponent},
  {path:'detail/:id', component:HeroDetailComponent},//i due punti dopo lo slash servono per dire che il valore inserito dopo il programma lo prenderà e lo userà per displayare i dettagli dell' eroe con quell' id
  {path:'dashboard', component:DashboardComponent  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule]
}) 

export class AppRoutingModule {
 

 }
