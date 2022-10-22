import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopCardsComponent } from './top-cards/top-cards.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AboutComponent } from './about/about.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CandidatosComponent } from './candidatos/candidatos.component';
import { ReporteTotalComponent } from './reporteTotal/reporteTotal.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'top-card',
        component: TopCardsComponent,
        data: {
          title: 'Login Page'
        }},
        {
          path: 'alumno',
          component: AlumnosComponent,
          data: {
              title: 'Login Page'
        }},
       {
          path: 'reporte',
          component: ReportesComponent,
          data: {
          title: 'Login Page'
        }},

       {
          path: 'usuario',
          component: UsuariosComponent,
          data: {
          title: 'Login Page'
        }},

       {
          path: 'candidatos',
          component: CandidatosComponent,
          data: {
          title: 'Login Page'
        }},
        {
          path: 'Acerca',
          component: AboutComponent,
          data: {
          title: 'Login Page'
        }},
        {
          path: 'ReporteTotal',
          component: ReporteTotalComponent,
          data: {
          title: 'Login Page'
        }}
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
];

@NgModule({
  imports: [FormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
