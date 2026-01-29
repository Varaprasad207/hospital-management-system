import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../doctor.model';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;

  newDoctor: Doctor = {
    id: 0,
    name: '',
    specialization: '',
    contact: ''
  };

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctors = this.doctorService.getDoctors();
  }

  addDoctor() {
    this.newDoctor.id = Date.now();
    this.doctorService.addDoctor(this.newDoctor);
    this.newDoctor = { id: 0, name: '', specialization: '', contact: '' };
    this.loadDoctors();
  }
  deleteDoctor(id: number) {
    this.doctorService.deleteDoctor(id);
    this.loadDoctors();
  }  
  editDoctor(doctor: Doctor) {
    this.selectedDoctor = { ...doctor };
  }
  updateDoctor() {
    const doctors = this.doctorService.getDoctors();
    const index = doctors.findIndex(d => d.id === this.selectedDoctor!.id);

    doctors[index] = this.selectedDoctor!;
    localStorage.setItem('doctors', JSON.stringify(doctors));

    this.selectedDoctor = null;
    this.loadDoctors();
  }  
  

}
