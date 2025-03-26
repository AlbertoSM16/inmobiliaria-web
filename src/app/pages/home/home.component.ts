import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { NavComponent } from '../../components/nav/nav.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import AOS from 'aos';

@Component({
  selector: 'home',
  standalone:true,
  imports: [NavComponent,LandingPageComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  
  ngOnInit(){
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
} 
