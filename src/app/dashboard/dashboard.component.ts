import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientService } from '../patients/patient.service';
import { DoctorService } from '../doctors/doctor.service';
import { AppointmentService } from '../appointments/appointment.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalPatients = 0;
  totalDoctors = 0;
  totalAppointments = 0;
  userRole = '';

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCounts();
    this.userRole = this.authService.getUserRole() || '';
  }

  loadCounts() {
    this.totalPatients = this.patientService.getPatients().length;
    this.totalDoctors = this.doctorService.getDoctors().length;
    this.totalAppointments = this.appointmentService.getAppointments().length;
  }
}
