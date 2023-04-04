import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdddoctorComponent } from '../adddoctor/adddoctor.component';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddnurseComponent } from '../addnurse/addnurse.component';
import { AddadminComponent } from '../addadmin/addadmin.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {


  constructor(public dialog: MatDialog, private service: AdminService) {}

  panelOpenState = false;

  ngOnInit() {
    this.getAppointmentCount();
    this.getDoctorCount();

    this.getPatientCount();
    this.getNurseCount();
  }
 

  openDialogAddDoc() {
    this.dialog.open(AdddoctorComponent);
  }

  openDialogAddNurse() {
    this.dialog.open(AddnurseComponent);
  }

  openDialogAddAdmin() {
    this.dialog.open(AddadminComponent);
  }



  public aCount : any;
  public dCount : any;
  public pCount : any;
  public nCount : any;

  public getAppointmentCount(): void {
    this.service.getAppointmentCount().subscribe(
      (response: any) => {
        this.aCount = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getDoctorCount(): void {
    this.service.getDoctorCount().subscribe(
      (response: any) => {
        this.dCount = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getPatientCount(): void {
    this.service.getPatientCount().subscribe(
      (response: any) => {
        this.pCount = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getNurseCount(): void {
    this.service.getNurseCount().subscribe(
      (response: any) => {
        this.nCount = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}