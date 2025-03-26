import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PersonalInfoComponent } from '../../pages/personal-info/personal-info.component';

@Component({
  selector: 'nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private router: Router) {}


}
