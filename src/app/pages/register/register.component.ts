import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  password = '';
  successMessage = '';

  constructor(private http: HttpClient) {}

  register() {
    const data = {
      officerId: 0,
      username: this.username,
      password: this.password,
      role: 'PlacementOfficer',
    };

    this.http.post('http://localhost:5044/api/PlacementOfficer/register', data, { responseType: 'text' })
      .subscribe({
        next: res => this.successMessage = res,
        error: err => console.error(err)
      });
  }
}
