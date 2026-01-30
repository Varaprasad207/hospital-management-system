import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentListComponent } from './appointments/appointment-list/appointment-list.component';
import { DoctorListComponent } from './doctors/doctor-list/doctor-list.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { AuthGuard } from './auth/auth-guard';
export const routes: Routes = [
    {
        path : '', redirectTo : 'login', pathMatch : 'full'
    },
    {
        path : 'login', component : LoginComponent
    },
    {
        path : 'dashboard', component : DashboardComponent, canActivate: [AuthGuard]
    },
    {
        path : 'patients', component : PatientListComponent, canActivate: [AuthGuard]
    },
    {
        path : 'doctors', component : DoctorListComponent, canActivate: [AuthGuard]
    },
    {
        path : 'appointments', component : AppointmentListComponent, canActivate: [AuthGuard]
    }
];
