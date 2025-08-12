import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

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
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(form: NgForm) {
    this.errorMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    this.authService
      .login(this.formData.email, this.formData.password)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.errorMessage = error.error.message;
          this.cdr.detectChanges();
          console.log('Not logged', error);
        },
      });
  }
}
