import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; // ✅ Add Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    // You can clear session or token here if needed
    console.log("Logging out...");
    this.router.navigate(['/']);
  }
}
