import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  formData = {
    username: '',
    email: '',
    profileImg: '',
  };

  errorMessage: string = '';

  ngOnInit(): void {
    this.authService.loadCurrentUserFromAPI();

    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        console.log('Got user in ProfilePage:', user);
        this.formData.email = user.email;
        this.formData.profileImg = user.profileImg || '';
        this.formData.username = user.username || '';
      }
    });
  }

  onSubmit(form: NgForm): void {
    this.errorMessage = '';
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const userId = this.authService.getUser('userId');
    console.log(`userId on profile page: ${userId}`);
    

    const updatedUser = {
      email: this.formData.email,
      username: this.formData.username,
      profileImg: this.formData.profileImg,
    };
  }
}
