import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly backend: string = "http://localhost:4000/appointments";

  constructor(private http: HttpClient) { }

  makeAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.backend}`, appointment);
  }

  getCurrentUserAppointments(user: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/user/${user}/current`);
  }

  getPastUserAppointments(user: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/user/${user}/past`);
  }

  cancelAppointment(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.backend}/${id}`);
  }

  getFirmPendingAppointments(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/firm/${id}/pending`);
  }

  acceptAppointment(id: number, decorator: string): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.backend}/${id}/accept`, { decorator });
  }

  declineAppointment(id: number, decorator: string, rejectionComment: string): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.backend}/${id}/decline`, { decorator, rejectionComment });
  }

  getDecoratorAcceptedAppointments(decorator: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/decorator/${decorator}/accepted`);
  }

  getDecoratorFinishedAppointments(decorator: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/decorator/${decorator}/finished`);
  }

  getDecoratorAppointments(decorator: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/decorator/${decorator}`);
  }

  getAppointmentsLast24Hours(): Observable<number> {
    return this.http.get<number>(`${this.backend}/stats/last-24-hours`);
  }

  getAppointmentsLast7Days(): Observable<number> {
    return this.http.get<number>(`${this.backend}/stats/last-7-days`);
  }

  getAppointmentsLast30Days(): Observable<number> {
    return this.http.get<number>(`${this.backend}/stats/last-30-days`);
  }

  getTotalDecoratedGardens(): Observable<number> {
    return this.http.get<number>(`${this.backend}/stats/total-decorated-gardens`);
  }

  getLastThreeFinishedAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/stats/recent-finished`);
  }

  getOwnerFinishedAppointments(owner: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/owner/${owner}/finished`);
  }

  getBusyDecorators(firmId: number, datetime: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.backend}/busy-decorators/${firmId}/${datetime}`);
  }

  finishAppointment(id: number): Observable<Appointment> {
    const now = new Date();
    const twoHoursInMs = 2 * 60 * 60 * 1000;

    return this.http.put<Appointment>(`${this.backend}/${id}/finish`, {
      finished: (new Date(now.getTime() + twoHoursInMs)).toISOString()
    });
  }

  attachPhoto(id: number, photo: File): Observable<Appointment> {
    const formData = new FormData();
    formData.append("photo", photo);

    return this.http.put<Appointment>(`${this.backend}/${id}/photo`, formData);
  }

  getDecoratorMonthlyAppointments(decorator: string, month: string): Observable<number> {
    return this.http.get<number>(`${this.backend}/decorator/${decorator}/monthly/${month}`);
  }

  getDailyAppointments(firmId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.backend}/firm/${firmId}/daily`);
  }

  requestMaintenance(id: number, status: string, maintenanceStart: string): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.backend}/${id}/request-maintenance`, { status, maintenanceStart });
  }

  getAppointmentsMaintenance(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/maintenance`);
  }

  getDecoratorMaintenance(decorator: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/decorator/${decorator}/maintenance`);
  }

  acceptMaintenance(id: number, maintenanceStart: string, maintenanceEnd: string): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.backend}/${id}/accept-maintenance`, { maintenanceStart, maintenanceEnd });
  }

  rejectMaintenance(id: number): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.backend}/${id}/reject-maintenance`, {});
  }

  getNotAttachedPhotoAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.backend}/unattached-photos`);
  }
}
