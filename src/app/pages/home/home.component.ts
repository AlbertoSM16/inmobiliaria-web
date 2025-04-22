import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [NavComponent, LandingPageComponent,RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const AOS = await import('aos');
      AOS.init();
    }
  }
  // AOS.init();
  // window.addEventListener('load', AOS.refresh);
}
