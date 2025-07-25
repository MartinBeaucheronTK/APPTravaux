import { listePDP } from './../tableau/tableau.component';
import { Component,OnInit, Pipe, PipeTransform,NgModule, ChangeDetectionStrategy, signal, model, inject  } from '@angular/core';
import{CommonModule} from '@angular/common';
import { CustomChunkPipe, PDP,EE } from '../app.component';
import { HomeComponent } from "../home/home.component";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'

export interface DialogData {
  titrePDP: string;
  idPDP: string;
  month: string;
  day:string;
}
export class CalendarDay {
  public date: Date;
  public title: string = "";
  public isPastDate: boolean;
  public isToday: boolean;

  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }
  public getDateString() {
    return this.date.toISOString().split("T")[0]
  }

}

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, CustomChunkPipe, HomeComponent,],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})



export class AgendaComponent implements OnInit {


  
  readonly titrePDP = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  readonly day = signal('');
  readonly month = signal('');
  public listePDP : PDP[] = [];
  public pdp1 = new PDP();
  public pdp2 = new PDP();
  public pdp3 = new PDP(); 
  

  
  public calendar: CalendarDay[] = [];
  public monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  public displayMonth: string = "";
  public displayYear: number = 0;
  private monthIndex: number = 0;
  ngOnInit(): void {
    // here we initialize the calendar
    this.generateCalendarDays(this.monthIndex);
    this.pdp1.idPDP=0
    this.pdp1.jour="5"
    this.pdp1.mois=this.monthNames[6]
    this.pdp1.titrePDP="bon anniv"
    this.pdp2.idPDP=1
    this.pdp2.jour="17"
    this.pdp2.mois=this.monthNames[6]
    this.pdp2.titrePDP="pourquoi pas au final"
    this.pdp3.idPDP=2
    this.pdp3.jour="7"
    this.pdp3.mois=this.monthNames[7]
    this.pdp3.titrePDP="il faut tester d'autre mois"
    this.listePDP.push(this.pdp1,this.pdp2,this.pdp3)
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date 
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];
    this.displayYear = day.getFullYear();
    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;
  
    // ok since we have our starting date then we get the next 41 days 
    // that we need to add in our calendar array
    // 41 cause our calendar will show 6 weeks and MATH say that
    // 6 weeks * 7 days = 42!!
    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }
  
  private getStartDateForCalendar(selectedDate: Date){
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));
  
    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;
  
    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }
  
    return startingDateOfCalendar;
  }
  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--;
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  public addItem(newPDP:PDP){
    this.listePDP.push(newPDP);
  }

  public getMonth(searchMonth: string){
    let condition = false
    for(let i = 0; i< this.listePDP.length; i++){
      if(searchMonth == this.listePDP[i].mois){
        condition = true
      }
    }
    return condition
  }

  public getDay(searchDay: string){
    let condition = false
    for(let i = 0; i< this.listePDP.length; i++){
      if(searchDay == this.listePDP[i].jour){
        condition = true
      }
    }
    return condition
  }

  public showItem(searchMonth: string, searchDay:string){
    let titrePDP: string = "";
    for(let i = 0; i< this.listePDP.length; i++){

      if(searchMonth == this.listePDP[i].mois){
        if(searchDay == this.listePDP[i].jour){
          titrePDP = this.listePDP[i].titrePDP;
        }
      }
    }
    return titrePDP;
  }

  public showAllItem(){
    for(let i = 0; i< this.listePDP.length; i++){
      return this.showItem(this.listePDP[i].mois,this.listePDP[i].jour);
    }
    return 
  }

  public showList(){
  var finalString="";

  // let i = 0
  // while(i<this.listePDP.length){
  //   finalString = finalString + this.listePDP[i].idPDP + ": " + this.listePDP[i].jour + " ";
  //   finalString = finalString + this.listePDP[i].mois + " ";
  //   finalString = finalString + this.listePDP[i].titrePDP + "; ";
  //   i++;
  // }
  // for(var PDP in this.listePDP){
  //   finalString += PDP + ": " + this.listePDP[PDP] + ";";
  // }
  for(let i = 0; i< this.listePDP.length; i++){
    
    finalString += this.listePDP[i].idPDP + ": " + this.listePDP[i].jour + " ";
    finalString += this.listePDP[i].mois + " ";
    finalString += this.listePDP[i].titrePDP + "; ";
  }
  return finalString;
  }


  public selectDate(seletedMonth:number):void{
    this.monthIndex = seletedMonth;
    this.generateCalendarDays(this.monthIndex);
  }
 
  openDialog(month:string, day:string): void {
    let planPrevention = new PDP();
    this.titrePDP.set("");    // this.showItem(this.month(),this.day()) a remettre dans la parenthes a la place des guillemets
    this.month.set("");
    this.day.set("");
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {titrePDP: this.titrePDP(),month: month, day:day},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.titrePDP();
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.titrePDP.set(result);
        this.month.set(month);
        this.day.set(day);
        planPrevention.idPDP = this.listePDP.length + 1;
        planPrevention.titrePDP = result;
        planPrevention.jour = day;
        planPrevention.mois = month;
        this.listePDP.push(planPrevention)
        
      }
    });
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'creation-pdp.component.html', 
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly titrePDP = model(this.data.titrePDP);

  onNoClick(): void {
    this.dialogRef.close();
  }
}