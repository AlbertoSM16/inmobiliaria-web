import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent,NavComponent,FooterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'inmobiliaria-web';
}
