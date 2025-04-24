import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { TableauComponent } from './tableau/tableau.component';
import { AgendaComponent } from './agenda/agenda.component';


export const routes: Routes = [
    { path: '',redirectTo:'homeAgenda', pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'homeTableau', component: TableauComponent },
    { path: 'homeAgenda', component: AgendaComponent},
    { path: '**', component: HomeComponent},
];