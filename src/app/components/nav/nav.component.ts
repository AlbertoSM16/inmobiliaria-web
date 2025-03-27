import { Component, OnInit } from '@angular/core';
import { Router, RouterModule,RouterOutlet } from '@angular/router';
import AOS from 'aos';
@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    AOS.init({
      duration: 1200
    }); 
  }
  
}
