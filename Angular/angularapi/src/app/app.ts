import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Header } from '../app/Components/shared/header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterModule, Header],
  standalone: true
})
export class App implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hasReloaded = sessionStorage.getItem('hasReloaded');
        if (!hasReloaded) {
          sessionStorage.setItem('hasReloaded', 'true');
          location.reload();
        } else {
          sessionStorage.removeItem('hasReloaded');
        }
      }
    });
  }
}
