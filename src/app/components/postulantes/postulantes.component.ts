import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


interface Postulante {
  id:number;
  usuario:String;
  fecha_nacimiento:string;
  nombres:string;
  apellidos: string;
  correo:string;
  celular:string;
  dni:string;
  cv_ruta: string;
}

@Component({
  selector: 'app-postulantes',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './postulantes.component.html',
  styleUrl: './postulantes.component.css'
})
export class PostulantesComponent {
  titulo: string = 'POSTULANTES';
  postulante: Postulante[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPostulantes();
  }

  obtenerPostulantes(): void {
    this.http.get<{ postulantes_aptos: Postulante[] }>('https://apinexuserv-ftdtfjdbc9aegrht.brazilsouth-01.azurewebsites.net/postulaciones/apto')
      .subscribe({
        next: (response) => {
          this.postulante = response.postulantes_aptos;
        },
        error: (error) => {
          console.error('Error al obtener postulantes:', error);
        }
      });
  }

  aceptarPostulante(id: number): void {
    alert(`Postulante con ID ${id} aceptado`);
  }

  eliminarPostulante(id: number): void {
    if (confirm('¿Estás seguro de eliminar este postulante?')) {
      this.postulante = this.postulante.filter(u => u.id !== id);
    }
  }

  descargarCV(nombreCV: string): void {
    console.log("Nonmbre CV: "+nombreCV );
    this.http.get<{ url: string }>(`https://apinexuserv-ftdtfjdbc9aegrht.brazilsouth-01.azurewebsites.net/get-cv-url/${nombreCV}`)
      .subscribe({
        next: (res) => {
          console.log(res);
          const link = document.createElement('a');
          link.href = res.url;
          console.log(res.url);
          link.download = nombreCV;
          link.target = '_blank';
          link.click();
        },
        error: (err) => {
          console.error('Error al obtener la URL del CV:', err);
          alert('No se pudo generar el enlace de descarga');
        }
      });
  }

}
