import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private router: Router) {}

  // Logout function
  logout() {
    console.log("Logging out...");
    this.router.navigate(['/']);
  }

  // Keyboard shortcut handler (Ctrl + M)
  private handleKeydown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'm') {
      alert(
        "👨‍💻 Developer: Monith N\n\n🚀 Full Stack Developer (Angular + .NET)(Django + Python) \n📧 Email: monith0404@gmail.com.com"
      );
    }
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.handleKeydown);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.handleKeydown);
  }
}
