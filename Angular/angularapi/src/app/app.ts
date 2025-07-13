import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Home } from "./home/home";
import { Footer } from './Components/shared/footer/footer';
import { Header } from './Components/shared/header/header';
import { Register } from './Components/auth/register/register';
import { Login } from './Components/auth/login/login';




@Component({
  selector: 'app-root',
  imports: [RouterModule,Footer,Header],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],

})
export class App {
  protected title = 'angularapi';
}


