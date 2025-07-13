import { Component } from '@angular/core';
import { Header } from "../header/header";

@Component({
  selector: 'app-not-found',
  imports: [Header],
  templateUrl: './not-found.html',    
  styleUrl: './not-found.css'
})
export class NotFound {
  goHome() {
    // Logic to navigate to the home page
    // This could be a router navigation or any other logic you want to implement
  }
  goBack() {
    // Logic to navigate back to the previous page
    // This could be a router navigation or any other logic you want to implement
  }

}

