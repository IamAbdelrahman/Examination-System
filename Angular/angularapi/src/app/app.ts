
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFound } from '../app/Components/shared/not-found/not-found';
import { Header } from '../app/Components/shared/header/header';



@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterModule, NotFound, Header, NotFound], 
})
export class App {
  protected title = 'angularapi';
}


