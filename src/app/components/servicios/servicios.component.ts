import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  imports: [[CommonModule, HttpClientModule]],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {
  services: any[] = [];
  serviceName: string = '';
  serviceDescription: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getServices();
  }

  // Obtener todos los servicioss
  getServices(): void {
    this.http.get<any[]>(`${environment.apiUrl}/services/`)
      .subscribe({
        next: res => this.services = res,
        error: err => console.error('Error al obtener servicios', err)
      });
  }

  // Crear un nuevo servicio
  createService(serviceName:any,serviceDescription:any): void {
    const newService = {
      name: serviceName,
      description: serviceDescription
    };

    this.http.post<any>(`${environment.apiUrl}/services/`, newService)
      .subscribe({
        next: res => {
          this.services.push(res);
          this.serviceName = '';  // Resetear el nombre
          this.serviceDescription = '';  // Resetear la descripción
        },
        error: err => console.error('Error al crear servicio', err)
      });
  }

  // Actualizar un servicio
  updateService(service: any): void {
    const updatedService = {
      name: service.name,
      description: service.description
    };

    this.http.put<any>(`${environment.apiUrl}/services/${service.id}`, updatedService)
      .subscribe({
        next: res => {
          const index = this.services.findIndex(s => s.id === service.id);
          if (index !== -1) {
            this.services[index] = res;
          }
        },
        error: err => console.error('Error al actualizar servicio', err)
      });
  }

  deleteService(service: any): void {
    this.http.delete<any>(`${environment.apiUrl}/services/${service.id}`)
      .subscribe({
        next: res => {
          this.services = this.services.filter(s => s.id !== service.id);
        },
        error: err => console.error('Error al eliminar servicio', err)
      });
  }
}
