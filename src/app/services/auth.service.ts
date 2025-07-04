import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5044/api';

  constructor(private http: HttpClient) {}

login(username: string, password: string) {
  return this.http.post(`${this.baseUrl}/Login`, {
    username,
    password
  });
  }
}
