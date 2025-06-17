import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  toggleSidebar(): void {
    const sidebar = document.querySelector('#sidebar');
    sidebar?.classList.toggle('expand');
  }

  
  logout(): void {
    console.log('👋 Cierre de sesión');
    this.router.navigateByUrl('/login');
  }
}
