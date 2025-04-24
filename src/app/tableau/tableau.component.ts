import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from "../header/header.component";
import { HeaderAcceuilComponent } from "../header-acceuil/header-acceuil.component";

export interface listePDP{
  numPDP:number;
  numOT:number;
  secteur:string;
  ut:string;
  equipement:string;
  libelle:string;
  semaine:number;
  prestataire:string;
}


const ELEMENT_DATA: listePDP[] = [
  {numPDP: 1, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
  {numPDP: 2, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
  {numPDP: 3, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
  {numPDP: 4, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
  {numPDP: 5, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
  {numPDP: 6, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
  {numPDP: 7, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
  {numPDP: 8, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
  {numPDP: 9, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
  {numPDP: 10, numOT:1, secteur:'',ut:'',equipement:'',libelle:'',semaine:2,prestataire:''},
];

@Component({
  selector: 'app-tableau',
  standalone: true,
  imports: [
    MatTableModule,
    HomeComponent,
],
  templateUrl: './tableau.component.html',
  styleUrl: './tableau.component.scss'
})
export class TableauComponent {
  displayedColumns: string[] = ['numPDP', 'numOT', 'secteur', 'ut','equipement','libelle','semaine','prestataire'];
  dataSource = ELEMENT_DATA;
}