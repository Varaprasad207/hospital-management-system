import { Injectable } from '@angular/core';
import { Patient } from './patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private storageKey = 'patients';

  getPatients(): Patient[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addPatient(patient: Patient) {
    const patients = this.getPatients();
    patients.push(patient);
    localStorage.setItem(this.storageKey, JSON.stringify(patients));
  }
}
