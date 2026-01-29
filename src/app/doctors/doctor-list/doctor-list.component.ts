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
}
