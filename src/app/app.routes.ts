import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';
import { PostulantesComponent } from './components/postulantes/postulantes.component';
import { ServiciosSolicitadosComponent } from './components/servicios-solicitados/servicios-solicitados.component';
import { TopEspecialistasComponent } from './components/top-especialistas/top-especialistas.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { authGuard } from './guards/auth.guard';
import { ServiciosComponent } from './components/servicios/servicios.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'',
        component:SidebarComponent,
        children:[
            {
                path:'mis-datos', component:MisDatosComponent, title:"Mis Datos", canActivate: [authGuard]
            },
            {
                path:'postulantes', component:PostulantesComponent, title:"Postulantes", canActivate: [authGuard]
            },
            {
                path:'servicios-solicitados', component:ServiciosSolicitadosComponent,title:"Servicios Solicitados", canActivate: [authGuard]
            },
            {
                path:'top-especialistas',component:TopEspecialistasComponent, title:"Top especialistas", canActivate: [authGuard]
            },
            {
                path:'usuarios',component:UsuariosComponent, title:"Usuarios", canActivate: [authGuard]
            },
            {
                path:'pagos',component:PagosComponent, title:"Pagos", canActivate: [authGuard]
            },
            {
                path:'servicios',component:ServiciosComponent, title:"Servicios",canActivate: [authGuard]
            }
        ],
        
    },
    {
        path:'**',
        component:PageNotFoundComponent
    }
];
