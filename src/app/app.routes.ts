import { Routes,RouterLink } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HousesListComponent } from './pages/houses-list/houses-list.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      data: { animation: 'HomePage' } 
    },
    {
      path: 'home',
      component: HomeComponent,
      data: { animation: 'ContactPage' }
    },
    {
      path: 'contact',
      component: ContactComponent,
      data: { animation: 'ContactPage' }
    },
    {
      path: 'quienes-somos',
      component: PersonalInfoComponent,
      data: { animation: 'AboutPage' }
    },
    {
      path: 'houses-list',
      component: HousesListComponent,
      data: { animation: 'HousesPage' }
    }
  ];
  
