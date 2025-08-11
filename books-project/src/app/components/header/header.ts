import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {

  loggedIn = false;
  private subscription!: Subscription;

  // loggedIn = true;
  profileImg: string = '';
  // username = 'testKris';

  constructor(public authService: AuthService, private router: Router) {}

  getUserName() {
    return this.authService.getUser('username');
  }

  getUserProfilePic() {
    return this.authService.getUser('profileImg') || "https://i.pravatar.cc/40";
  }

  ngOnInit(): void {
    this.subscription = this.authService.loggedIn$.subscribe((status) => {
      console.log('Logged in status changed:', status);
      this.loggedIn = status;
      this.profileImg =
        localStorage.getItem('profileImg') || 'https://i.pravatar.cc/40';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
