import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ContatosComponent } from './components/contatos/contatos.component';

const routes: Routes = [
  { path: 'eventos', component: EventosComponent},
  { path: 'dashboards', component: DashboardComponent},
  { path: 'palestrantes', component: PalestrantesComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'contatos', component: ContatosComponent},
  { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboards', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
