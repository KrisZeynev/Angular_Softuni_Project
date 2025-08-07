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
  profileImg: string = '';
  // username = 'testKris';

  constructor(public authService: AuthService, private router: Router) {}

  getUserName() {
    return this.authService.getUser('username');
  }

  getUserProfilePic() {
    return this.authService.getUser('profileImg') || "https://i.pravatar.cc/40";
  }

  // getUserProfilePic() {
  //   // console.log(`here: ${typeof this.authService.getUser('profileImg')}`);

  //   // if ((this.authService.getUser('profileImg')) !== null) {
  //   //   console.log('ima snimka batio');
  //   //   // return
  //   // }

  //   console.log(`'ima snimka batio': ${this.authService.getUser('profileImg')}`);
  //   console.log(`'asdasd': ${this.authService.getUser('profileImg') !== null}`);

  //   // return "https://i.pravatar.cc/40"
  //   return this.authService.getUser('profileImg') !== null || this.authService.getUser('profileImg') !== undefined
  //   || this.authService.getUser('profileImg') !== "undefined"
  //   ? this.authService.getUser('profileImg') 
  //   : 'https://i.pravatar.cc/40'
  //   // return this.authService.getUser('profileImg') ?? "https://i.pravatar.cc/40";
  // }

  ngOnInit(): void {
    this.subscription = this.authService.loggedIn$.subscribe((status) => {
      console.log('Logged in status changed:', status);
      this.loggedIn = status;
      this.profileImg =
        localStorage.getItem('profileImg') || 'https://i.pravatar.cc/40';
    });
    // this.loggedIn = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
