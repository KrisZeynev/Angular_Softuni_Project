import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/userService';
import { Router } from '@angular/router';
// import { RouterModule } from '@angular/router';
// import { Router } from '@angular/router'; 
// import { User } from '../../models';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private authService = inject(AuthService);
  private userService = inject(UserService); 
  private router = inject(Router)

  formData = {
    username: '',
    email: '',
    profileImg: '',
  };

  errorMessage = '';

  ngOnInit(): void {
    const user = this.authService.currentUser();
    console.log(`user: ${user}`);
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

    console.log(`currId: ${currentUser.id}`)

    const updatedUser = {
      email: this.formData.email,
      username: this.formData.username,
      profileImg: this.formData.profileImg,
    };


    this.userService.updateUser(currentUser.id, updatedUser).subscribe({
    // this.userService.updateUser(currentUser.id, updatedUser).subscribe({
      next: (user) => {
        console.log('User updated successfully:', user);
        this.errorMessage = '';

        localStorage.setItem('currentUser', JSON.stringify(user));
        // this.authService.update(user: User);

        // this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.errorMessage = 'Failed to update user data. Please try again.';
      },
    });

    

    console.log('updated data', updatedUser);
  }
}
