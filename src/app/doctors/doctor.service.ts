import { Injectable } from '@angular/core';
import { Doctor } from './doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private storageKey = 'doctors';

  getDoctors(): Doctor[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addDoctor(doctor: Doctor) {
    const doctors = this.getDoctors();
    doctors.push(doctor);
    localStorage.setItem(this.storageKey, JSON.stringify(doctors));
  }
}
