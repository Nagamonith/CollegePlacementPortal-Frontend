import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private baseUrl = 'http://localhost:5044/api/company'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(company: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, company);
  }

  delete(id: number) {
  return this.http.delete(`http://localhost:5044/api/company/${id}`, { responseType: 'text' });
}


  update(id: number, company: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, company);
  }
}
