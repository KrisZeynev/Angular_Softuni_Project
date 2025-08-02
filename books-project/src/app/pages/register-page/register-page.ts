import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  formData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  // private authService = inject(AuthService);

  onSubmit(form: any) {
    console.log(`username: ${this.formData.username}`);
    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.errorMessage = '';

    this.authService
      .register(
        this.formData.username,
        this.formData.email,
        this.formData.password,
        this.formData.confirmPassword
      )
      .subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.errorMessage =
            err.error?.message || 'Registration failed. Please try again.';
        },
      });
  }
  
}
