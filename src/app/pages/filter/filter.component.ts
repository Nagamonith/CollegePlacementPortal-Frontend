import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  companies: any[] = [];
  selectedCompanyId: number | null = null;
  selectedCompany: any = null;
  eligibleStudents: any[] = [];
  showResults = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.http.get<any[]>('http://localhost:5044/api/company').subscribe(data => {
      this.companies = data;
    });
  }

  onCompanyChange() {
    this.selectedCompany = this.companies.find(c => c.companyId === +this.selectedCompanyId!);
  }

  filterStudents() {
    if (this.selectedCompanyId !== null) {
      this.http.get<any[]>(`http://localhost:5044/api/filter/eligible/${this.selectedCompanyId}`)
        .subscribe(data => {
          this.eligibleStudents = data;
          this.showResults = true;
        });
    }
  }

  exportToExcel() {
    const rows = this.eligibleStudents;
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Name', 'Branch', 'CGPA', 'Skills', 'Phone', 'Backlogs', 'PassoutYear'].join(',') +
      '\n' +
      rows.map(s =>
        [s.name, s.branch, s.cgpa, s.skills, s.phone, s.backlogs, s.passoutYear].join(',')
      ).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'eligible_students.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
