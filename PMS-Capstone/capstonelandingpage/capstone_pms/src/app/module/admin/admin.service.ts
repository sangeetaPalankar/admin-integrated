import { Injectable } from '@angular/core';
import { PatientData } from './components/patientinfo/patientinfo.component';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { DoctorData } from './components/doctoravailability/doctoravailability.component';
import { NurseData } from './components/nurseinfo/nurseinfo.component';
import { AdminData } from './components/admininfo/admininfo.component';
import { tap } from 'rxjs/operators';
import { AddAdmin } from './components/addadmin/addadmin.component';
import { AddDoctor } from './components/adddoctor/adddoctor.component';
import { AddNurse } from './components/addnurse/addnurse.component';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  
  public myVar: any;

  public currentRole:any;
  private apiServerDoctor = 'http://localhost:9007/api/v1';

  constructor(private http: HttpClient) {}

  // auto-refresh
  private refresh = new Subject<void>();
  get refreshNeeded() {
    return this.refresh;
  }

  //set and roles for deletion
  public setRole(role: string) {
    this.currentRole = role;
  }
  public getRole() {
    return this.currentRole;
  }

  public getPatients(): Observable<PatientData[]> {
    return this.http.get<PatientData[]>('http://localhost:9006/api/v1/patient');
  }

  public getNurses(): Observable<NurseData[]> {
    return this.http.get<NurseData[]>('http://localhost:9005/api/v1/nurses');
  }

  public getAdmins(): Observable<AdminData[]> {
    return this.http.get<AdminData[]>('http://localhost:9005/api/v1/admins');
  }

  //Physician Availability List
  public availablePhysicians(): Observable<DoctorData[]> {
    return this.http.get<DoctorData[]>(
      `${this.apiServerDoctor}/physician-availability`
    );
  }

  //update
  public updatePhysicianAvailability(
    doctor: DoctorData
  ): Observable<DoctorData> {
    return (
      this.http
        .put<DoctorData>(
          `${this.apiServerDoctor}/physician-availability`,
          doctor
        )
        //auto-refresh
        .pipe(
          tap(() => {
            this.refresh.next();
          })
        )
    );
  }

  public availablePhysiciansUpdate(
    doctor: DoctorData
  ): Observable<DoctorData[]> {
    return this.http.put<DoctorData[]>(
      `${this.apiServerDoctor}/physician-availability`,
      doctor
    );
  }

  public deletePhysicianAvailability(doctorEmail: string): Observable<void> {
    return this.http
      .delete<void>(
        `${this.apiServerDoctor}/physician-availability/${doctorEmail}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }



  public deleteNurseDatabase(nurseEmail: string): Observable<void> {
    return this.http
      .delete<void>(
        `http://localhost:9005/api/v1/deleteNurse/${nurseEmail}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }


  public deleteAdminFromDatabase(adminEmail: string): Observable<void> {
    return this.http
      .delete<void>(
        `http://localhost:9005/api/v1/deleteAdmin/${adminEmail}`
      )
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  public deleteDoctor(doctorEmail: string): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:8080/api/v1/deleteUser/${doctorEmail}`)
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  public deleteNurse(nurseEmail: string): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:8080/api/v1/deleteUser/${nurseEmail}`)
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }

  public deleteAdmin(adminEmail: string): Observable<void> {
    return this.http
      .delete<void>(`http://localhost:8080/api/v1/deleteUser/${adminEmail}`)
      .pipe(
        tap(() => {
          this.refresh.next();
        })
      );
  }



  addPhysicianService(adddoc : AddDoctor)  : Observable<Object>{
    console.log("service data: ", adddoc)
    return this.http.post(`http://localhost:8080/api/v1/addUser`, adddoc);
  }

  addAdminService(addadmin : AddAdmin)  : Observable<Object>{
    return this.http.post(`http://localhost:8080/api/v1/addUser`, addadmin);
  }

  addNurseService(addnurse : AddNurse)  : Observable<Object>{
    return this.http.post(`http://localhost:8080/api/v1/addUser`, addnurse);
  }

  // public availablePhysiciansdelete(doctor: string): Observable<string[]> {
  //   return this.http.delete<string[]>(
  //     `${this.apiServerDoctor}/physician-availability/{doctor}`
  //   );
  // }

  public setThatVar(sangeeta: string) {
    this.myVar = sangeeta;
  }

  public getThatVar() {
    return this.myVar;
  }


  public addDoctorUser(): Observable<DoctorData[]> {
    
    return this.http.get<DoctorData[]>('http://localhost:9007/api/v1/addDoctors')
    .pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }

  addAdminUser(): Observable<DoctorData[]> {
    return this.http.get<DoctorData[]>('http://localhost:9005/api/v1/addAdmins')
    .pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }

  addNurseUser(): Observable<DoctorData[]> {
    return this.http.get<DoctorData[]>('http://localhost:9005/api/v1/addNurses')
    .pipe(
      tap(() => {
        this.refresh.next();
      })
    );
  }


  //Sangeeta
  public getAppointmentCount(): Observable<any> {
    return this.http.get<any>('http://localhost:9003/api/v1/appointmentCount');
  }

  public getDoctorCount(): Observable<any> {
    return this.http.get<any>('http://localhost:9007/api/v1/doctorCount');
  }

  public getPatientCount(): Observable<any> {
    return this.http.get<any>('http://localhost:9006/api/v1/patientCount');
  }

  public getNurseCount(): Observable<any> {
    return this.http.get<any>('http://localhost:9005/api/v1/nurseCount');
  }










 

}