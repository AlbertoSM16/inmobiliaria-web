import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
