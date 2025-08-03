import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router = inject(Router);
  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;

  profileImg = computed(() => this.authService.currentUser()?.profileImg || 'https://i.pravatar.cc/40');
  // profileImg = computed

  get loggedIn(): boolean {
    return this.isLoggedIn();
  }

  get username(): string {
  return this.currentUser()?.username || 'Guest';
}
  
  logout(): void {
    console.log("you've logged out");
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Logout failed', err);
      },
    });
  }
}
