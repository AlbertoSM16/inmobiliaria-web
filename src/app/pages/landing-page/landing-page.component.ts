import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'landing-page',
  imports: [RouterModule],
  standalone:true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  constructor(private router:Router){}
  title = 'La forma más fácil y segura de encontrar tu próxima propiedad'
}
