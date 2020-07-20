import { DetailsMissionComponent } from './details-mission/details-mission.component';
import { Mission } from './model/Mission';
import { Component, ViewChild } from '@angular/core';
import { extend, closest } from '@syncfusion/ej2-base';
import { EventSettingsModel,
  View, ScheduleComponent, CellClickEventArgs } from '@syncfusion/ej2-angular-schedule';
import { GridComponent, RowDDService, EditService, EditSettingsModel, RowDropSettingsModel } from '@syncfusion/ej2-angular-grids';
import { livreurs, motos , adresses } from './data';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' ,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'drag-resize-actions';
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  @ViewChild('livreur')
  public livreur: GridComponent;
  @ViewChild('moto')
  public moto: GridComponent;
  @ViewChild('adresse')
  public adresse: GridComponent;

  missions: Mission[] = [];
  missionsFormatted: Mission[] = [];

  todaysCount = 0;
  futureDaysCount = 0;
  
  constructor(public dialog: MatDialog) {}

// Scheduler data
  public data: Object[] = <Object[]>extend([], livreurs, null, true);
  public selectedDate: Date = new Date();
  public currentView: View = 'Month';
  public eventSettings: EventSettingsModel = {
     dataSource: this.data,
     fields: {
         subject: { title: 'Patient Name', name: 'Name' },
     }
  };

// Grid data
  public livreursData: Object = livreurs;
  public motoData: Object = motos;
  public addresseData: Object = adresses;
  public allowDragAndDrop: boolean = true;
  public srcDropOptions: RowDropSettingsModel = { targetID: 'Schedule' };
  public primaryKeyVal: boolean = true;
  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true
  };

  onRowDrag(event: any): void { 
    event.cancel = true;
  }

  onDragStopLivreur(event: any): void {
    console.log(event.target);
    event.cancel = true;
    const scheduleElement: Element = <Element>closest(event.target, '.e-content-wrap');
    console.log(scheduleElement);
    if (scheduleElement) {
       if (event.target.classList.contains('e-work-cells')) {
          const filteredData: Object = event.data;
          console.log(filteredData);
          const cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
          const eventData: { [key: string]: any } = {
                Id: filteredData[0].Id,
                Name: filteredData[0].Name,
                StartTime: cellData.startTime,
                EndTime: cellData.endTime,
           };
          console.log(eventData);
          let tempData = {
              id: Math.floor(Math.random() * 100) + 1,
              name: filteredData[0].Name,
              dateDeMission: cellData.startTime,
              adresseMission: '',
              motoMission: ''
          };
          this.scheduleObj.addEvent(eventData);
          this.missionsFormatted.push(tempData);

          if(tempData.dateDeMission.setHours(0,0,0,0) == new Date().setHours(0,0,0,0)){
            this.todaysCount++;
          }
          else if (tempData.dateDeMission.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)){
            this.futureDaysCount++;
          }

          // if (this.missions.length === 0) {
          //   console.log(0);
          //   this.missions = [{
              
          //   }];
          // } else {
          //   console.log(1);
          //   this.missions.forEach(mis => {
          //     mis.id = Math.floor(Math.random()),
          //     // tslint:disable-next-line: align
          //     mis.name = eventData.Name,
          //     mis.dateDeMission = cellData.startTime,
          //     mis.adresseMission = '';
          //     this.missionsFormatted.push(mis);
          //   });
          // }
     
          console.log(this.missionsFormatted);
          // this.scheduleObj.openEditor(eventData, 'Add', true);
          this.livreur.deleteRecord(event.data[0]);
         }
     }
  }
  onDragStopMoto(event: any): void {
    console.log(event);
    event.cancel = true;
    const scheduleElement: Element = <Element>closest(event.target, '.e-content-wrap');
    console.log(scheduleElement);
    if (scheduleElement) {
       if (event.target.classList.contains('e-work-cells')) {
          const filteredData: Object = event.data;
          let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
          let eventData: { [key: string]: Object } = {
                Id: filteredData[0].Id,
                Name: filteredData[0].Name,
                 StartTime: cellData.startTime,
                 EndTime: cellData.endTime,
           };
          this.scheduleObj.addEvent(eventData);
          this.missionsFormatted.forEach(element => {
            console.log(element.dateDeMission);
            console.log(cellData.startTime);
            console.log(element.dateDeMission == cellData.startTime);
            
            if(element.dateDeMission.getTime() === cellData.startTime.getTime() ){
              element.motoMission = filteredData[0].Name;
            }
          });
          console.log(this.missionsFormatted);
          // this.scheduleObj.openEditor(eventData, 'Add', true);
          this.moto.deleteRecord(event.data[0]);
         }
     }
  }
  onDragStopAdresse(event: any): void {
    console.log(event);
    event.cancel = true;
    const scheduleElement: Element = <Element>closest(event.target, '.e-content-wrap');
    console.log(scheduleElement);
    if (scheduleElement) {
       if (event.target.classList.contains('e-work-cells')) {
          const filteredData: Object = event.data;
          let cellData: CellClickEventArgs = this.scheduleObj.getCellDetails(event.target);
          let eventData: { [key: string]: Object } = {
                Id: filteredData[0].Id,
                Name: filteredData[0].Name,
                StartTime: cellData.startTime,
                EndTime: cellData.endTime,
           };
           console.log(cellData);
          this.scheduleObj.addEvent(eventData);
          this.missionsFormatted.forEach(element => {
            console.log(element.dateDeMission);
            console.log(cellData.startTime);
            console.log(element.dateDeMission == cellData.startTime);
            
            if(element.dateDeMission.getTime() === cellData.startTime.getTime() ){
              element.adresseMission = filteredData[0].Name;
            }
          });
          console.log(this.missionsFormatted);
          // this.scheduleObj.openEditor(eventData, 'Add', true);
          this.adresse.deleteRecord(event.data[0]);
         }
     }
  }
  openDialog(dataMission) {
    console.log(dataMission);
    const dialogRef = this.dialog.open(DetailsMissionComponent, {
      data: dataMission,
      width: '50%'
    });
  }
}
