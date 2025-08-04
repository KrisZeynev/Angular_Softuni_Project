import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

//
import { UserService, User } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  // private router = inject(Router);
  // private authService = inject(AuthService);
  // private userService = inject(UserService);
  // readonly isLoggedIn = this.authService.isLoggedIn;
  // readonly currentUser = this.authService.currentUser;

  loggedIn = false;
  private subscription!: Subscription;

  // loggedIn = true;
  profileImg = '';
  username = 'testKris';

  constructor(public authService: AuthService, private router: Router) {}

  getUserName() {
    return this.authService.getUser('username');
  }

  getUserProfilePic() {
    return this.authService.getUser('profileImg');
  }

  ngOnInit(): void {
    this.subscription = this.authService.loggedIn$.subscribe((status) => {
      console.log('Logged in status changed:', status);
      this.loggedIn = status;
    });
    this.loggedIn = true
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}