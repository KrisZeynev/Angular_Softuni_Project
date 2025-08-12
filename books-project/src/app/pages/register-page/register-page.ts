import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
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

    this.authService
      .register(
        this.formData.username,
        this.formData.email,
        this.formData.password,
        this.formData.profileImg
      )
      .subscribe({
        next: (user) => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Registration failed';
          this.cdr.detectChanges();
        },
      });
  }
}
