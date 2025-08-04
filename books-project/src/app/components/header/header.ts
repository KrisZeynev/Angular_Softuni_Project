import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

//
import { UserService, User } from '../../core/services/user.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // private router = inject(Router);
  // private authService = inject(AuthService);
  // private userService = inject(UserService);
  // readonly isLoggedIn = this.authService.isLoggedIn;
  // readonly currentUser = this.authService.currentUser;

  loggedIn = true
  profileImg = ''
  username = 'testKris'

  // profileImg = computed(
  //   () =>
  //     this.authService.currentUser()?.profileImg || 'https://i.pravatar.cc/40'
  // );
  // // profileImg = computed

  // get loggedIn(): boolean {
  //   return this.isLoggedIn();
  // }

  // get username(): string {
  //   return this.currentUser()?.username || 'Guest';
  // }

  // get currUsername(): string {
  //   const userObj = localStorage.getItem('currentUser');
  //   if (userObj) {
  //     const parsedObj = JSON.parse(userObj);
  //     return parsedObj.username || 'Guest';
  //   }
  //   return 'Guest';
  // }

  // logout(): void {
  //   console.log("you've logged out");
  //   this.authService.logout().subscribe({
  //     next: () => {
  //       this.router.navigate(['/login']);
  //     },
  //     error: (err) => {
  //       console.log('Logout failed', err);
  //     },
  //   });
  // }
}

// import { Component, inject } from '@angular/core';
// import { Router, RouterModule } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { AsyncPipe } from '@angular/common';

// import { User } from '../../models/user.model';
// import { logoutUser } from '../../state/user/user.actions';
// import { selectIsLoggedIn, selectCurrentUser } from '../../state/user/user.selectors';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterModule, AsyncPipe],
//   templateUrl: './header.html',
//   styleUrl: './header.css',
// })
// export class Header {
//   private router = inject(Router);
//   private store = inject(Store);

//   isLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
//   currentUser$: Observable<User | null> = this.store.select(selectCurrentUser);

//   logout(): void {
//     this.store.dispatch(logoutUser());
//     this.router.navigate(['/login']);
//   }
// }
