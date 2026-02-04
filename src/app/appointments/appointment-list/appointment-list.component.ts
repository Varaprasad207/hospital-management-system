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

  selectedPatientId: number | null = null;
  selectedDoctorId: number | null = null;

  appointmentDate = '';
  reason = '';
  selectedAppointment: Appointment | null = null;

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

  // ✅ STEP 1: Validation (PASTE THIS AT TOP)
  if (
    !this.selectedPatientId ||
    !this.selectedDoctorId ||
    !this.appointmentDate ||
    !this.reason
  ) {
    alert('Please fill all appointment details');
    return;
  }

  // ✅ STEP 2: Your existing logic (KEEP THIS)
  const selectedPatient = this.patients.find(
    p => p.id === this.selectedPatientId
  );

  const selectedDoctor = this.doctors.find(
    d => d.id === this.selectedDoctorId
  );

  const appointment: Appointment = {
    id: Date.now(),
    patientId: this.selectedPatientId,
    patientName: selectedPatient?.name || '',
    doctorId: this.selectedDoctorId,
    doctorName: selectedDoctor?.name || '',
    date: this.appointmentDate,
    reason: this.reason
  };

  this.appointmentService.addAppointment(appointment);

  // reset form
  this.selectedPatientId = null;
  this.selectedDoctorId = null;
  this.appointmentDate = '';
  this.reason = '';

  this.loadData();
}



 deleteAppointment(id: number) {
   this.appointmentService.deleteAppointment(id);
   this.loadData();
  }
 editAppointment(appt: Appointment) {
   this.selectedAppointment = { ...appt };
 }
 updateAppointment() {
   const appointments = this.appointmentService.getAppointments();
   const index = appointments.findIndex(
    a => a.id === this.selectedAppointment!.id
   );

   appointments[index] = this.selectedAppointment!;
   localStorage.setItem('appointments', JSON.stringify(appointments));

   this.selectedAppointment = null;
   this.loadData();
   const patient = this.patients.find(
    p => p.id === this.selectedAppointment!.patientId
   );
   const doctor = this.doctors.find(
    d => d.id === this.selectedAppointment!.doctorId
   );

   this.selectedAppointment!.patientName = patient?.name || '';
   this.selectedAppointment!.doctorName = doctor?.name || '';

  }
  loadAppointments() {
  this.appointments = this.appointmentService.getAppointments();
}


}
