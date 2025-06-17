import { Component } from '@angular/core';

interface TopEspecialistas{
  id_top_especialistas:number;
  nombre:string;
  apellidos: string;
  tipo_servicio:string;
  realizados:number;
}

@Component({
  selector: 'app-top-especialistas',
  imports: [],
  templateUrl: './top-especialistas.component.html',
  styleUrl: './top-especialistas.component.css'
})
export class TopEspecialistasComponent {
  titulo: string = 'TOP ESPECIALISTAS';
  topPostulantes: TopEspecialistas[]=
  [
    {
      id_top_especialistas:1,
      nombre: 'Carlos',
      apellidos: 'Pérez Gómez',
      tipo_servicio:'Gafitero',
      realizados:100
    },
    {
      id_top_especialistas:2,
      nombre: 'Lucía',
      apellidos: 'Rodríguez Torres',
      tipo_servicio:'Carpintero',
      realizados:50
    },
    {
      id_top_especialistas:3,
      nombre: 'Marco',
      apellidos: 'Jiménez Soto',
      tipo_servicio:'Electricista',
      realizados: 40
    }
  ]
}
