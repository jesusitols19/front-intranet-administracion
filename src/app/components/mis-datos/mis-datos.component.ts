import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-datos',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mis-datos.component.html',
  styleUrl: './mis-datos.component.css'
})
export class MisDatosComponent {
  titulo: string = 'MIS DATOS';
  datosForm: FormGroup;
  editando = false;
  datosOriginales: any;


  constructor(private fb: FormBuilder) {
    this.datosForm = this.fb.group({
      nombre: ['Jesus Alberto Sanchez Paredes'],
      telefono: ['987654321'],
      email: ['example@gmail.com'],
      dni: ['87654321'],
      fechaNacimiento: ['2000-10-10']
    });
    this.datosOriginales = this.datosForm.getRawValue();

  }

  toggleEditar(): void {
    if (this.editando) {
      console.log('Datos actualizados:', this.datosForm.value);
      this.datosOriginales = this.datosForm.getRawValue(); 
    }
    this.editando = !this.editando;
  }

  cancelarEdicion(): void {
    this.datosForm.patchValue({
      nombre: this.datosOriginales.nombre,
      telefono: this.datosOriginales.telefono,
      email: this.datosOriginales.email
    });
    this.editando = false;
  }
}
