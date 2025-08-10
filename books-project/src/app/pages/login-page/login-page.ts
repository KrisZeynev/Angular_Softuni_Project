import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  formData = {
    email: '',
    password: '',
  };

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
  ) {}

  onSubmit(form: NgForm) {
    this.errorMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const currUserData = {
      email: this.formData.email,
      password: this.formData.password,
    };

    this.http.post('http://localhost:3030/users/login', currUserData).subscribe({
      next: (response: any) => {
        console.log('logged in', response);
        this.authService.saveUser(response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.cdr.detectChanges();
        console.log('Not logged', error);
      },
    });

    // this.authService.login(this.formData.email, this.formData.password).subscribe({
    //   next: (user) => {
    //     console.log('Logged in', user);
    //     form.resetForm();
    //     this.router.navigate(['/home']);
    //   },
    //   error: (err) => {
    //     this.errorMessage = err.error?.message || 'Login failed. Please try again.';
    //     this.cdr.detectChanges();
    //   },
    // });
  }
}
