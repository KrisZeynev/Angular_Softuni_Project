import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage  {
  private authService = inject(AuthService);
  private userService = inject(UserService);

  formData = {
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    profileImg: localStorage.getItem('profileImg') || '',
  };

  constructor(private router: Router, private http: HttpClient) {}
  

  // errorMessage: string = '';

  ngOnInit(): void {
    this.authService.currentUser().subscribe({
      next: (user) => {
        console.log('User:', user.username);
        console.log('Email:', user.email);
        console.log('Picture:', user.profileImg);
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
  //   this.errorMessage = '';
  //   if (form.invalid) {
  //     this.errorMessage = 'Please fill all required fields correctly.';
  //     return;
  //   }

  //   const userId = this.authService.getUser('userId');
  //   console.log(`userId on profile page: ${userId}`);

  //   const updatedUserData = {
  //     email: this.formData.email,
  //     username: this.formData.username,
  //     profileImg: this.formData.profileImg,
  //   };

  //   const token = this.authService.getUser('accessToken') || '';
  //   console.log(`tokena: ${token}`);
    
  //   const headers = new HttpHeaders({
  //     'X-Authorization': token,
  //     // 'Content-Type': 'application/json',
  //   });

  //   this.http
  //     // .patch(`http://localhost:3030/users/me`, {updatedUserData}, {
  //     .patch(`http://localhost:3030/users/${userId}`, {updatedUserData}, {
  //       headers,
  //     })
  //     .subscribe({
  //       next: (response) => {
  //         console.log('User updated successfully', response);
  //         localStorage.setItem('email', this.formData.email)
  //         localStorage.setItem('username', this.formData.username)
  //         localStorage.setItem('profileImg', this.formData.profileImg)
  //         this.router.navigate(['/home']);
  //       },
  //       error: (error) => {
  //         console.error('Update failed', error);
  //       },
  //     });

  //   // Content-Type: application/json
  //   // this.http
  //   //   .patch(`http://localhost:3030/users/${userId}`, updatedUserData)
  //   //   .subscribe({
  //   //     next: (response) => {
  //   //       console.log('User updated successfully', response);
  //   //       this.authService.saveUser(response);
  //   //       this.router.navigate(['/home']);
  //   //     },
  //   //     error: (error) => {
  //   //       console.error('Update failed', error);
  //   //     },
  //   //   });
  // }
}
