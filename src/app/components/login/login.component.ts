import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { HttpClient,HttpClientModule, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      ADM_USUARIO: ['', Validators.required],
      ADM_CONTRASENIA: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { ADM_USUARIO, ADM_CONTRASENIA } = this.loginForm.value;

      const formData = new FormData();
      formData.append('email', ADM_USUARIO);
      formData.append('password', ADM_CONTRASENIA);

      this.http.post<any>(`${environment.apiUrl}/auth/cliente`, formData).subscribe({
        next: res => {
          console.log('✅ Login exitoso:', res);
          // Guardar en localStorage
          localStorage.setItem('user_data', JSON.stringify(res));
          this.router.navigate(['/mis-datos']);
        },
        error: err => {
          console.error('❌ Error de login:', err);
          alert('Credenciales incorrectas');
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
