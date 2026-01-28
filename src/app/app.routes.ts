import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';
import { DoctorListComponent } from './doctors/doctor-list/doctor-list.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
export const routes: Routes = [
    {
        path : '', redirectTo : 'login', pathMatch : 'full'
    },
    {
        path : 'login', component : LoginComponent
    },
    {
        path : 'dashboard', component : DashboardComponent
    },
    {
        path : 'patients', component : PatientListComponent
    },
    {
        path : 'doctors', component : DoctorListComponent
    },
    {
        path : 'appointments', component : AppointmentListComponent
    }
];
