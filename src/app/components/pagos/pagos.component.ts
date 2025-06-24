import { Component, inject, OnInit } from '@angular/core';
import { HttpClient,HttpClientModule, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { environment } from '../../../environments/environment';

interface Pago {
  id: number; 
  specialist_name: string;
  client_name: string;
  amount: number;
  status: string;
  created_at: string;
}

@Component({
  selector: 'app-pagos',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './pagos.component.html',
  styleUrl: './pagos.component.css'
})
export class PagosComponent implements OnInit {

  pagos: Pago[] = [];
  pagosFiltrados: Pago[] = [];

  fechaInicio = new FormControl('');
  fechaFin = new FormControl('');
  estado = new FormControl('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerPagos();
  }

  obtenerPagos(): void {
    this.http.get<Pago[]>(`${environment.apiUrl}/admin/pagos`).subscribe(data => {
      this.pagos = data;
      this.pagosFiltrados = [...this.pagos];
    });
  }

  aplicarFiltros(): void {
    let pagos = [...this.pagos];

    const inicio = this.fechaInicio.value ? new Date(this.fechaInicio.value) : null;
    const fin = this.fechaFin.value ? new Date(this.fechaFin.value) : null;
    const estado = this.estado.value;

    if (inicio) {
      pagos = pagos.filter(p => new Date(p.created_at) >= inicio);
    }
    if (fin) {
      pagos = pagos.filter(p => new Date(p.created_at) <= fin);
    }
    if (estado) {
      pagos = pagos.filter(p => p.status === estado);
    }

    this.pagosFiltrados = pagos;
  }

  cambiarEstadoEvento(pagoId: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const valor = selectElement?.value || '';
    this.cambiarEstado(pagoId,valor);
  }

  cambiarEstado(pagoId: number, nuevoEstado: string): void {
    const body = new FormData();
    body.append('estado', nuevoEstado);
    this.http.put(`${environment.apiUrl}/admin/pagos/${pagoId}/estado`, body).subscribe(() => {
      const pago = this.pagos.find(p => p.id === pagoId);
      if (pago) pago.status = nuevoEstado;
      this.aplicarFiltros();
    });
  }
}
