import { Component } from '@angular/core';
import { Router, RouterModule,RouterOutlet } from '@angular/router';
import { PersonalInfoComponent } from '../../pages/personal-info/personal-info.component';

@Component({
  selector: 'nav',
  imports: [RouterModule,RouterOutlet],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private router: Router) {}

  goToContact(){
    this.router.navigate(['/contact']);
  }
}
