import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

interface Usuario {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: boolean;
  role_id: number;
  role_name: string;
  phones: string[];
  addresses: string[];
  documents: string[];
}
@Component({
  selector: 'app-usuarios',
  imports: [[CommonModule, HttpClientModule]],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];

  rolSeleccionado: string = 'Todos';
  estadoSeleccionado: string = 'Todos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Usuario[]>(`${environment.apiUrl}/admin/usuarios`)
      .subscribe({
        next: res => {
          this.usuarios = res;
          this.aplicarFiltro();
        },
        error: err => console.error('Error al obtener usuarios', err)
      });
  }

  aplicarFiltro(): void {
    this.usuariosFiltrados = this.usuarios.filter(u =>
      (this.rolSeleccionado === 'Todos' || u.role_name === this.rolSeleccionado) &&
      (this.estadoSeleccionado === 'Todos' || (this.estadoSeleccionado === 'Activo' ? u.status : !u.status))
    );

    this.usuariosFiltrados = this.usuariosFiltrados.sort((a, b) => a.id - b.id);
  }

  onRolChangeEvento(event: Event):void{
    const selectElement = event.target as HTMLSelectElement;
    const valor = selectElement?.value || '';
    this.onRolChange(valor);
  }

  onRolChange(valor: string): void {
    this.rolSeleccionado = valor;
    this.aplicarFiltro();
  }

  onEstadoChangeEvento(event: Event):void{
    const selectElement = event.target as HTMLSelectElement;
    const valor = selectElement?.value || '';
    this.onEstadoChange(valor);
  }

  onEstadoChange(valor: string): void {
    this.estadoSeleccionado = valor;
    this.aplicarFiltro();
  }

  cambiarEstado(usuario: Usuario): void {
    const nuevoEstado = !usuario.status;

    const formData = new FormData();
    formData.append('estado', nuevoEstado.toString());

    this.http.put(`${environment.apiUrl}/admin/usuarios/${usuario.id}/estado`, formData)
      .subscribe({
        next: () => {
          usuario.status = nuevoEstado;
          this.aplicarFiltro(); // refrescar vista
        },
        error: err => {
          console.error('Error al cambiar estado:', err);
          alert('No se pudo actualizar el estado del usuario.');
        }
      });
  }

}