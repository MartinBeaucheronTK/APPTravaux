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
  secteur: string;
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


  
  readonly secteur = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  readonly day = signal('');
  readonly month = signal('');


  
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
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  public selectDate(seletedMonth:number){
    this.monthIndex = seletedMonth;
    this.generateCalendarDays(this.monthIndex);
  }
  planPrevention = new PDP();
  public getSelectedDate(monthName:string, day:string):void{
    alert("Vous avez selectionner le " + day + " " + monthName);
    this.planPrevention.jour = day;
    this.planPrevention.mois = monthName;
  }
  openDialog(month:string, day:string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {secteur: this.secteur(),month: month, day:day},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.secteur.set(result);
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
  readonly secteur = model(this.data.secteur);

  onNoClick(): void {
    this.dialogRef.close();
  }
}