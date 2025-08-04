// import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImg: '',
  };

  errorMessage: string = '';

  constructor(
    // private authService: AuthService,
    private router: Router,
    // private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  onSubmit(form: NgForm) {
    this.errorMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // this.http

     const currUserData = {
      username: this.formData.username,
      email: this.formData.email,
      password: this.formData.password,
      profileImg: this.formData.profileImg,
    };
    console.log(currUserData);

    this.http.post('http://localhost:3030/users/register', currUserData).subscribe({
      next: (response) => {
        console.log('succesfully registered', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('Not registered', error);
      },
    });

    // this.authService
    //   .register(
    //     this.formData.username,
    //     this.formData.email,
    //     this.formData.password,
    //     this.formData.confirmPassword,
    //     this.formData.profileImg,
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       console.log('Registration successful', response);

    //       form.resetForm();

    //       this.router.navigate(['/home']);
    //     },
    //     error: (err) => {
    //       console.error('Registration failed', err);
    //       this.errorMessage =
    //         err.error?.message || 'Registration failed. Please try again.';
    //       this.cdr.detectChanges();
    //     },
    //   });
  }
}
