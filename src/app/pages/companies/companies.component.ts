import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {
resetCompanyForm() {
throw new Error('Method not implemented.');
}
message: any;
submitCompany() {
  if (this.isEditing && this.editingCompanyId !== null) {
    this.updateCompany();
  } else {
    this.createCompany();
  }
}

companies: any[] = [];
newCompany = this.getEmptyCompany();
isEditing = false;
editingCompanyId: number | null = null;

constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.fetchCompanies();
}


  getEmptyCompany() {
    return {
      name: '',
      category: '',
      requiredSkills: '',
      requiredCGPA: 0,
      jobRole: '',
      allowedBacklogs: 0,
      eligiblePassoutYear: new Date().getFullYear(),
      description: '',
      location: '',
      package: 0
    };
  }

  fetchCompanies() {
    this.http.get<any[]>('http://localhost:5044/api/company').subscribe(data => {
      this.companies = data;
    });
  }

 createCompany() {
  this.http.post<any>('http://localhost:5044/api/company', this.newCompany).subscribe({
    next: (data) => {
      this.companies.push(data);                  // Add new company to the list
      this.newCompany = this.getEmptyCompany();   // Reset form
      this.message = '✅ Company added successfully!';
    },
    error: (err) => {
      console.error('Error adding company:', err);
      this.message = '❌ Failed to add company. Please try again.';
    }
  });
}


  deleteCompany(id: number) {
    if (confirm('Are you sure you want to delete this company?')) {
      this.http.delete(`http://localhost:5044/api/company/${id}`).subscribe(() => {
        this.companies = this.companies.filter(c => c.companyId !== id);
      });
    }
  }

  editCompany(company: any) {
    this.newCompany = { ...company };
    this.editingCompanyId = company.companyId;
    this.isEditing = true;
  }

  updateCompany() {
    if (this.editingCompanyId !== null) {
      this.http.put<any>(`http://localhost:5044/api/company/${this.editingCompanyId}`, this.newCompany)
        .subscribe(updated => {
          const index = this.companies.findIndex(c => c.companyId === this.editingCompanyId);
          if (index > -1) {
            this.companies[index] = updated;
          }
          this.cancelEdit();
        });
    }
  }

  cancelEdit() {
    this.newCompany = this.getEmptyCompany();
    this.editingCompanyId = null;
    this.isEditing = false;
  }
}
