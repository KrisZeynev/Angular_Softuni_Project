import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // isLoggedIn: boolean = false;
  
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
