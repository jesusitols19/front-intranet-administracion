import { CanActivateFn,Router  } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userData = localStorage.getItem('user_data');

  if (userData) {
    return true;
  }

  // Redirigir al login si no está autenticado
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};
