import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
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
export class ProfilePage implements OnInit {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  formData = {
    username: '',
    email: '',
    profileImg: '',
  };

  errorMessage = '';

  onSubmit(form: NgForm): void {
    console.log('test submit');
  }

  ngOnInit(): void {
    this.authService.currentUser().subscribe({
      next: (user) => {
        console.log('User:', user?.username);
        if (user) {
          console.log('ajde');
          this.formData.email = user.email || '';
          this.formData.profileImg = user.profileImg || '';
          this.formData.username = user.username || '';
        }
      },
      error: (err) => {
        console.error('Failed to fetch user:', err);
      },
    });
  }

  // onSubmit(form: NgForm): void {
  //   if (form.invalid) {
  //     this.errorMessage = 'Please fill all required fields correctly.';
  //     return;
  //   }

  //   const currentUser = this.authService.currentUser();
  //   console.log('current', currentUser);

  //   if (!currentUser || !currentUser.id) {
  //     this.errorMessage = 'User not logged in or missing user ID.';
  //     return;
  //   }

  //   console.log(`currId: ${currentUser.id}`);

  //   const updatedUser = {
  //     email: this.formData.email,
  //     username: this.formData.username,
  //     profileImg: this.formData.profileImg,
  //   };

  //   this.userService.updateUser(currentUser.id, updatedUser).subscribe({
  //     // this.userService.updateUser(currentUser.id, updatedUser).subscribe({
  //     next: (user) => {
  //       console.log('User updated successfully:', user);
  //       this.errorMessage = '';

  //       localStorage.setItem('currentUser', JSON.stringify(user));

  //       // this.router.navigate(['/home']);
  //     },
  //     error: (err) => {
  //       console.error('Error updating user:', err);
  //       this.errorMessage = 'Failed to update user data. Please try again.';
  //     },
  //   });
  //   console.log('updated data', updatedUser);
  // }
}
