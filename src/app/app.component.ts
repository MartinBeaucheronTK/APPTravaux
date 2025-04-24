import { Component,OnInit, Pipe, PipeTransform  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from './header/header.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'maquetteApplicationTravaux';
}

@Pipe({
  name: 'CustomChunk',
  standalone: true
})
export class CustomChunkPipe implements PipeTransform {

  transform(calendarDaysArray: any[], chunkSize: number): any[] {
    let calendarDays: any[][] = [];
    let weekDays: any[] = [];
    
    // On utilise `forEach` plutôt que `map` pour faire un effet secondaire
    calendarDaysArray.forEach((day: any, index: number) => {
        weekDays.push(day);
        if ((index + 1) % chunkSize === 0) {
          calendarDays.push(weekDays);
          weekDays = []; // Réinitialiser la semaine
        }
    });

    // Ajouter le dernier "chunk" s'il reste des jours dans `weekDays`
    if (weekDays.length > 0) {
      calendarDays.push(weekDays);
    }

    return calendarDays;
  }
}

export class EE{
  idEE:number = 0;
  nomEE: string = "";
  
}

export class PDP{
  idPDP:number = 0;
  titrePDP:string = "";
  numOT:string = "";
  secteur:string="";
  jour:string = "";
  mois:string = "";
  constructor(){
    this.titrePDP= "PDP" + this.idPDP;
  }




}