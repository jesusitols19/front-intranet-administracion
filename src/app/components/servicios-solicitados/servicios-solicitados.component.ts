import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

interface Solicitados{
  id_ServicioSolicitado:number;
  nombre:string;
  apellidos: string;
  tipo_servicio:string;
  fecha_registro: Date;
  pdf:string;
}

@Component({
  selector: 'app-servicios-solicitados',
  imports: [DatePipe],
  templateUrl: './servicios-solicitados.component.html',
  styleUrl: './servicios-solicitados.component.css'
})
export class ServiciosSolicitadosComponent {
  titulo: string = 'SERVICIOS SOLICITADOS';
  
  solicitados: Solicitados[]=[
    {
      id_ServicioSolicitado:1,
      nombre: 'Carlos',
      apellidos: 'Pérez Gómez',
      tipo_servicio:'Gafitero',
      fecha_registro: new Date('2025-05-20'),
      pdf:'pdf/carlos.pdf'
    },
    {
      id_ServicioSolicitado:2,
      nombre: 'Lucía',
      apellidos: 'Rodríguez Torres',
      tipo_servicio:'Carpintero',
      fecha_registro: new Date('2025-05-20'),
      pdf:'pdf/lucia.pdf'
    },
    {
      id_ServicioSolicitado:3,
      nombre: 'Marco',
      apellidos: 'Jiménez Soto',
      tipo_servicio:'Electricista',
      fecha_registro: new Date('2025-05-20'),
      pdf: 'pdf/marco.pdf'
    }
  ]

  descargarCV(rutaCV: string): void {
    const link = document.createElement('a');
    link.href = rutaCV;
    link.download = rutaCV.split('/').pop() || 'cv.pdf';
    link.target = '_blank';
    link.click();
  }
}
