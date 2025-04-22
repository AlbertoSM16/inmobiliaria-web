import { Routes,RouterLink } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HousesListComponent } from './pages/houses-list/houses-list.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HouseInfoComponent } from './pages/house-info/house-info.component';
import { CreateHouseComponent } from './pages/create-house/create-house.component';
import { EditHouseComponent } from './pages/edit-house/edit-house.component';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
      data: { animation: 'HomePage' } 
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
    },
    {
      path: 'inmueble/:id', 
      component: HouseInfoComponent,
      data: { animation: 'houseInfoAnimation'}

    },
    {
      path:'inmueble/edit/:id',
      component: EditHouseComponent, 
      data: { animation: 'editHouseAnimation'}
    },
    {
      path:'create',
      component: CreateHouseComponent,
      data: { animation: 'createHouseAnimation'}
    },
    {
      path: 'login',
      component: LoginComponent,
      data: { animation: 'LoginPage' }
    }
  ];
  
