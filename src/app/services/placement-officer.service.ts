import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacementOfficerService {
  private baseUrl = 'http://localhost:5044/api/PlacementOfficer';

  constructor(private http: HttpClient) {}

  register(officer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, officer, { responseType: 'text' });
  }
}
