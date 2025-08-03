import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../models';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private authService = inject(AuthService);

  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImg: '',
  };

  errorMessage = '';

  ngOnInit(): void {
    const user = this.authService.currentUser();
    console.log(user);
    if (user) {
      this.formData.email = user.email || '';
      this.formData.profileImg = user.profileImg || '';
      this.formData.username = user.username || '';
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const currentUser = this.authService.currentUser();
    console.log('current', currentUser);

    if (!currentUser || !currentUser.id) {
      this.errorMessage = 'User not logged in or missing user ID.';
      return;
    }

    const updatedUser: User = {
      id: currentUser.id,
      email: this.formData.email,
      username: this.formData.username,
      profileImg: this.formData.profileImg,
    };

    this.authService.update(updatedUser).subscribe({
    next: (user) => {
      console.log('User updated successfully:', user);
      this.errorMessage = '';
      this.formData.password = '';
      this.formData.confirmPassword = '';
    },
    error: (err) => {
      console.error('Error updating user:', err);
      // this.errorMessage = 'Failed to update user data. Please try again.';
    },
  });

    console.log('updated data', updatedUser);

    // console.log('Submitted formData:', this.formData);
  }
}
