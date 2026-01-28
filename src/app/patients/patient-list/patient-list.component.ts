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
}
