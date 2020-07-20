import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ScheduleModule, DayService, WeekService, WorkWeekService, MonthService, 
         DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';
import { GridModule, RowDDService, EditService } from '@syncfusion/ej2-angular-grids';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatDialogModule} from '@angular/material/dialog';
import { DetailsMissionComponent } from './details-mission/details-mission.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';







@NgModule({
  declarations: [
    AppComponent,
    DetailsMissionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ScheduleModule,
    MatButtonModule,
    FormsModule,
    ScrollingModule,
    MatDialogModule,
    MatTooltipModule,
    GridModule,
  MatDialogModule,
  MatTooltipModule,

  ],
  entryComponents: [DetailsMissionComponent],
  providers: [ DayService, WeekService, WorkWeekService, MonthService, 
  DragAndDropService, ResizeService, RowDDService, EditService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
