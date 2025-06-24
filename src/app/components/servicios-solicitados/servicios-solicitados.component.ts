import { Component, OnInit, inject } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

interface Solicitud {
  id: number;
  service_name: string;
  client_name: string;
  specialist_name: string | null;
  status: string;
  acceptance_status: string;
  requested_at: string;
}

@Component({
  selector: 'app-servicios-solicitados',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './servicios-solicitados.component.html',
  styleUrl: './servicios-solicitados.component.css'
})
export class ServiciosSolicitadosComponent {

  solicitudes: Solicitud[] = [];
  solicitudesFiltradas: Solicitud[] = [];

  estado = new FormControl('');
  estadoAceptacion = new FormControl('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes(): void {
    this.http.get<Solicitud[]>(`${environment.apiUrl}/admin/solicitudes`).subscribe(data => {
      this.solicitudes = data;
      this.solicitudesFiltradas = [...data];
    });
  }

  aplicarFiltros(): void {
    let solicitudes = [...this.solicitudes];
    if (this.estado.value) {
      solicitudes = solicitudes.filter(s => s.status === this.estado.value);
    }
    if (this.estadoAceptacion.value) {
      solicitudes = solicitudes.filter(s => s.acceptance_status === this.estadoAceptacion.value);
    }
    this.solicitudesFiltradas = solicitudes;
  }

  cancelarSolicitud(id: number): void {
    const form = new FormData();
    form.append('accion', 'cancelar');
    this.http.put(`${environment.apiUrl}/admin/solicitudes/${id}/accion`, form).subscribe(() => {
      const solicitud = this.solicitudes.find(s => s.id === id);
      if (solicitud) solicitud.status = 'Cancelado';
      this.aplicarFiltros();
    });
  }

  reasignarSolicitud(id: number): void {
    const form = new FormData();
    form.append('accion', 'reasignar');
    this.http.put(`${environment.apiUrl}/admin/solicitudes/${id}/accion`, form).subscribe(() => {
      const solicitud = this.solicitudes.find(s => s.id === id);
      if (solicitud) solicitud.acceptance_status = 'Pendiente';
      this.aplicarFiltros();
    });
  }
}
