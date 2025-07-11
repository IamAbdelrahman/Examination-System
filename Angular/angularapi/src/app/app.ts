import { Component } from '@angular/core';
import { Header } from "./modules/shared/components/header/header";
import { RouterLink, RouterModule } from '@angular/router';
import { NotFound } from "./modules/shared/components/not-found/not-found";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterModule, NotFound, Header], 
})
export class App {
  protected title = 'angularapi';
}
