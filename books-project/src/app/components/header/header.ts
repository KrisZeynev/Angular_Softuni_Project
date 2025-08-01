import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isLoggedIn: boolean = true;
  
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
