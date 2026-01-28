import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Patient } from '../patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  selectedPatient: Patient | null = null;

  newPatient: Patient = {
    id: 0,
    name: '',
    age: 0,
    gender: '',
    contact: ''
  };

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.loadPatients();
  }

  loadPatients() {
    this.patients = this.patientService.getPatients();
  }

  addPatient() {
    this.newPatient.id = Date.now(); // simple unique ID
    this.patientService.addPatient(this.newPatient);
    this.newPatient = { id: 0, name: '', age: 0, gender: '', contact: '' };
    this.loadPatients();
  }
  deletePatient(id: number) {
  this.patientService.deletePatient(id);
  this.loadPatients();
  }
  updatePatient() {
  const patients = this.patientService.getPatients();
  const index = patients.findIndex(p => p.id === this.selectedPatient!.id);

  patients[index] = this.selectedPatient!;
  localStorage.setItem('patients', JSON.stringify(patients));

  this.selectedPatient = null;
  this.loadPatients();
}
editPatient(patient: Patient) {
  // Create a copy (IMPORTANT)
  this.selectedPatient = { ...patient };
}


}
