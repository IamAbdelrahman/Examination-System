import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Home } from "./home/home";
import { Login } from './modules/auth/login/login';
import { Register } from './modules/auth/register/register';
import { Footer } from './modules/shared/components/footer/footer';
import { Header } from './modules/shared/components/header/header';


@Component({
  selector: 'app-root',
  imports: [RouterModule,Footer,Header],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected title = 'angularapi';
}
