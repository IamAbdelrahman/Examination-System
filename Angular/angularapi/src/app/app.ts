import { Component } from '@angular/core';
import { Navbar } from "./layout/navbar/navbar";
import { RouterLink, RouterModule } from '@angular/router';
import { NotFound } from "./layout/not-found/not-found";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterModule, NotFound], 
})
export class App {
  protected title = 'angularapi';
}
