import { Routes,RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HousesListComponent } from './pages/houses-list/houses-list.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';


export const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path:"houses-list",
        component:HousesListComponent
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"quienes-somos",
        component:PersonalInfoComponent
    }
];
