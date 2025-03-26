import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate } from '@angular/animations';
import { routeAnimations } from './route-animations';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations] 

})
export class AppComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  prepareRoute(outlet: any) {
    return outlet?.activatedRouteData?.['animation'] || 'default';
  }
}
