import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private authService = inject(AuthService);

  formData = {
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    profileImg:
      localStorage.getItem('profileImg') ||
      'https://stanfordopticians.co.uk/wp-content/uploads/2016/04/default-profile.png',
  };

  ngOnInit(): void {
    this.authService.currentUser().subscribe({
      next: (user) => {
        if (user) {
          this.formData.email = user.email || '';
          this.formData.profileImg =
            user.profileImg ||
            'https://stanfordopticians.co.uk/wp-content/uploads/2016/04/default-profile.png';
          this.formData.username = user.username || '';
        }
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
      },
    });
  }
}
