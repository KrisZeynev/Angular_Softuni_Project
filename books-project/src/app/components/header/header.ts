import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from "../../core/services/auth.service"

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // isLoggedIn: boolean = false;
  // const authService = inject(AuthService);
  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;
  readonly currentUser = this.authService.currentUser;

  get loggedIn(): boolean {
    return this.isLoggedIn();
  }
  
  logout(): void {
    console.log("you've logged out")
    // this.authService.logout().subscribe({
    //   next: () => {
    //     this.router.navigate(['/home']);
    //   },
    //   error: (err) => {
    //     console.log('Logout failed', err);
    //   }
    // });
  }
}