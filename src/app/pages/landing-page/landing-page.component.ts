import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'landing-page',
  imports: [RouterOutlet,NavComponent],
  standalone:true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  title = 'La forma más fácil y segura de encontrar tu próxima propiedad'
}
