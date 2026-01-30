import { Injectable } from '@angular/core';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private storageKey = 'appointments';

  getAppointments(): Appointment[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addAppointment(appointment: Appointment) {
    const appointments = this.getAppointments();
    appointments.push(appointment);
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
  }
  deleteAppointment(id: number) {
    const appointments = this.getAppointments().filter(a => a.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(appointments));
  }  
}
