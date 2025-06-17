import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MisDatosComponent } from './components/mis-datos/mis-datos.component';
import { PostulantesComponent } from './components/postulantes/postulantes.component';
import { ServiciosSolicitadosComponent } from './components/servicios-solicitados/servicios-solicitados.component';
import { TopEspecialistasComponent } from './components/top-especialistas/top-especialistas.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
                path:'mis-datos', component:MisDatosComponent, title:"Mis Datos"
            },
            {
                path:'postulantes', component:PostulantesComponent, title:"Postulantes"
            },
            {
                path:'servicios-solicitados', component:ServiciosSolicitadosComponent,title:"Servicios Solicitados"
            },
            {
                path:'top-especialistas',component:TopEspecialistasComponent, title:"Top especialistas"
            }
        ],
        
    },
    {
        path:'**',
        component:PageNotFoundComponent
    }
];
