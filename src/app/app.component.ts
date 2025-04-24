import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './route-animations';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeAnimations]

})
export class AppComponent implements AfterViewInit {

  isLoggedIn$!: Observable<boolean>;

  constructor(private cdr: ChangeDetectorRef, private authService: AuthService) { }

  ngAfterViewInit(): void {

    this.isLoggedIn$ = this.authService.isLoggedIn$;

    this.cdr.detectChanges();
  }
  prepareRoute(outlet: any) {
    return outlet?.activatedRouteData?.['animation'] || 'default';
  }


  logout() {
    this.authService.logout();
  }

}
