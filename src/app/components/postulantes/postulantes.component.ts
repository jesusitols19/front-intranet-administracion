import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


interface Postulante {
  cv_id:number;
  uploaded_at:string;
  user_id:number;
  first_name:string;
  last_name: string;
  email:string;
  file_path: string;
}

@Component({
  selector: 'app-postulantes',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './postulantes.component.html',
  styleUrl: './postulantes.component.css'
})
export class PostulantesComponent {
  titulo: string = 'POSTULANTES';
  postulante: any[] = [];
  detalleIA: string = '';
  detalleNombre: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPostulantes();
  }

  obtenerPostulantes(): void {
    console.log("Entre aca");
    this.http.get<any[]>(`${environment.apiUrl}/cvs/apto`)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.postulante = response; // Es un array directamente
        },
        error: (error) => {
          console.error('Error al obtener postulantes:', error);
        }
      });
  }

  filtrarEstadoDesdeEvento(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const valor = selectElement?.value || '';
    this.filtrarEstado(valor);
  }

  filtrarEstado(estado: string): void {
    this.http.get<Postulante[]>(`${environment.apiUrl}/cvs/estado/${estado}`)
      .subscribe({
        next: res => this.postulante = res,
        error: err => console.error('Error al filtrar:', err)
      });
  }

  verDetalleIA(cvId: number): void {
    this.http.get<any>(`${environment.apiUrl}/cvs/detalle/${cvId}`)
      .subscribe({
        next: res => {
          this.detalleIA = res.resultado_ia;
          this.detalleNombre = res.nombre;
        },
        error: err => {
          console.error("Error al obtener detalle del CV", err);
          alert("No se pudo obtener el análisis de IA.");
        }
      });
  }

  exportarAExcel(): void {
    const datosExportar = this.postulante.map(p => ({
      ID: p.user_id,
      Nombres: p.first_name,
      Apellidos: p.last_name,
      Correo: p.email,
      Archivo_CV: p.file_path,
      Fecha_Subida: p.uploaded_at
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosExportar);

    // Ajustar anchos de columna (opcional)
    worksheet['!cols'] = [
      { wch: 10 },
      { wch: 20 },
      { wch: 20 },
      { wch: 30 },
      { wch: 40 },
      { wch: 25 }
    ];

    const workbook: XLSX.WorkBook = {
      Sheets: { 'Postulantes': worksheet },
      SheetNames: ['Postulantes']
    };

    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, 'postulantes.xlsx');
  }


  aceptarPostulante(id: number): void {
    if (confirm(`¿Estás seguro de aceptar al postulante con ID ${id}?`)) {
      this.http.put(`${environment.apiUrl}/postulantes/aceptar/${id}`, null)
        .subscribe({
          next: res => {
            alert('✅ Postulante aceptado y correo enviado correctamente');
            // Recargar lista de postulantes
            this.obtenerPostulantes();
          },
          error: err => {
            console.error('❌ Error al aceptar postulante:', err);
            alert('Ocurrió un error al aceptar al postulante.');
          }
        });
    }
  }


  eliminarPostulante(id: number): void {
    if (confirm('¿Estás seguro de eliminar este postulante?')) {
      this.postulante = this.postulante.filter(u => u.user_id !== id);
    }
  }

  descargarCV(nombreCV: string): void {
    console.log("Nonmbre CV: "+nombreCV );
    this.http.get<{ url: string }>(`${environment.apiUrl}/get-cv-url/${nombreCV}`)
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
