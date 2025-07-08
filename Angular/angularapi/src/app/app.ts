import { Component } from '@angular/core';
import { Navbar } from "./layout/navbar/navbar";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Navbar]
})
export class App {
  protected title = 'angularapi';
}
