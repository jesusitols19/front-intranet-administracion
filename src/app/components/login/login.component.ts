import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      ADM_USUARIO: ['', Validators.required],
      ADM_CONTRASENIA: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { ADM_USUARIO, ADM_CONTRASENIA } = this.loginForm.value;

      
      if (ADM_USUARIO === 'admin123' && ADM_CONTRASENIA === '123456') {
        console.log('✅ Login exitoso');
        this.router.navigateByUrl('/mis-datos'); 
      } else {
        console.log('❌ Usuario o contraseña incorrectos');
        alert('Usuario o contraseña incorrectos');
      }

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
