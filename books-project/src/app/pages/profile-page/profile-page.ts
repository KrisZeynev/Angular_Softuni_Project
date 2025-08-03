import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

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

  ngOnInit(): void {
    const user = this.authService.currentUser();
    console.log(user);
    if (user) {
      this.formData.email = user.email || '';
      this.formData.profileImg = user.profileImg || '';
      this.formData.username = user.username || '';
    }
  }

  onSubmit(): void {
    console.log('Submitted formData:', this.formData);
  }
}
