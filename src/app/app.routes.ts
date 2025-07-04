import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentsComponent } from './pages/students/students.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { FilterComponent } from './pages/filter/filter.component';
import { ExportComponent } from './pages/export/export.component';
import { RegisterComponent } from './pages/register/register.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'filter', component: FilterComponent },
  { path: 'export', component: ExportComponent }, 
  { path: 'register', component: RegisterComponent },

];
