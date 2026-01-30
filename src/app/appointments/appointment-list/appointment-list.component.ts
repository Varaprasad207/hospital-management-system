import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment.model';

import { PatientService } from '../../patients/patient.service';
import { DoctorService } from '../../doctors/doctor.service';

import { Patient } from '../../patients/patient.model';
import { Doctor } from '../../doctors/doctor.model';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments: Appointment[] = [];
  patients: Patient[] = [];
  doctors: Doctor[] = [];

  selectedPatientId!: number;
  selectedDoctorId!: number;
  appointmentDate = '';
  reason = '';

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.appointments = this.appointmentService.getAppointments();
    this.patients = this.patientService.getPatients();
    this.doctors = this.doctorService.getDoctors();
  }

  bookAppointment() {
  const patientId = Number(this.selectedPatientId);
  const doctorId = Number(this.selectedDoctorId);

  const patient = this.patients.find(p => p.id === patientId);
  const doctor = this.doctors.find(d => d.id === doctorId);

  if (!patient || !doctor) {
    return;
  }

  const appointment: Appointment = {
    id: Date.now(),
    patientId: patient.id,
    patientName: patient.name,
    doctorId: doctor.id,
    doctorName: doctor.name,
    date: this.appointmentDate,
    reason: this.reason
  };

  this.appointmentService.addAppointment(appointment);

  this.selectedPatientId = 0;
  this.selectedDoctorId = 0;
  this.appointmentDate = '';
  this.reason = '';

  this.loadData();
}

}
