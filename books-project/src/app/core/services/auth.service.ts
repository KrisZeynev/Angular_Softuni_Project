// import { Injectable, signal } from '@angular/core';
// import { ApiUser, User } from '../../models';
// import { HttpClient } from '@angular/common/http';
// import { map, Observable, tap } from 'rxjs';

// //
// import { Store } from '@ngrx/store';
// import { loginUser, logoutUser } from '../../state/user/user.actions';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000/api';
//   private _isLoggedIn = signal<boolean>(false);
//   private _currentUser = signal<User | null>(null);

//   public isLoggedIn = this._isLoggedIn.asReadonly();
//   public currentUser = this._currentUser.asReadonly();

//   constructor(private httpClient: HttpClient, private store: Store) {
//     const savedUser = localStorage.getItem('currentUser');
//     if (savedUser) {
//       const user = JSON.parse(savedUser);
//       this._currentUser.set(user);
//       this._isLoggedIn.set(true);
//     }
//   }

//   public setCurrentUser(user: User | null): void {
//     this._currentUser.set(user);
//     if (user) {
//       this._isLoggedIn.set(true);
//       localStorage.setItem('currentUser', JSON.stringify(user));
//     } else {
//       this._isLoggedIn.set(false);
//       localStorage.removeItem('currentUser');
//     }
//   }

//   login(email: string, password: string): Observable<User> {
//     return this.httpClient
//       .post<ApiUser>(
//         `${this.apiUrl}/login`,
//         { email, password },
//         {
//           withCredentials: true,
//         }
//       )
//       .pipe(
//         map((apiUser) => this.mapApiUserToUser(apiUser)),
//         tap((user) => {
//           this._currentUser.set(user);
//           this._isLoggedIn.set(true);
//           localStorage.setItem('currentUser', JSON.stringify(user));

//           // Update NGRX Store
//         this.store.dispatch(loginUser({ user }));
//         })
//       );
//   }

//   register(
//     username: string,
//     email: string,
//     password: string,
//     rePassword: string,
//     profileImg: string
//   ): Observable<User> {
//     return this.httpClient
//       .post<ApiUser>(
//         `${this.apiUrl}/register`,
//         {
//           username,
//           email,
//           password,
//           rePassword,
//           profileImg,
//         },
//         {
//           withCredentials: true,
//         }
//       )
//       .pipe(
//         map((apiUser) => this.mapApiUserToUser(apiUser)),
//         tap((user) => {
//           this._currentUser.set(user);
//           this._isLoggedIn.set(true);
//           localStorage.setItem('currentUser', JSON.stringify(user));
//         })
//       );
//   }

//   logout(): Observable<void> {
//     return this.httpClient
//       .post<void>(
//         `${this.apiUrl}/logout`,
//         {},
//         {
//           withCredentials: true,
//         }
//       )
//       .pipe(
//         tap(() => {
//           this._currentUser.set(null);
//           this._isLoggedIn.set(false);
//           localStorage.removeItem('currentUser');

//         // Update NGRX Store
//         this.store.dispatch(logoutUser());
//         })
//       );
//   }

//   getCurrentUserId(): string | null {
//     return this._currentUser()?.id || null;
//   }

//   // might remove it:
//   // update(user: User): Observable<User> {
//   //   return this.httpClient
//   //     .put<ApiUser>(
//   //       `${this.apiUrl}/users/${user.id}`,
//   //       // `${this.apiUrl}/profile`,
//   //       {
//   //         _id: user.id,
//   //         email: user.email,
//   //         username: user.username,
//   //         profileImg: user.profileImg,
//   //       },
//   //       {
//   //         withCredentials: true,
//   //       }
//   //     )
//   //     .pipe(
//   //       map((apiUser) => this.mapApiUserToUser(apiUser)),
//   //       tap((user) => {
//   //         this._currentUser.set(user);
//   //         localStorage.setItem('currentUser', JSON.stringify(user));
//   //       })
//   //     );
//   // }

//   // update
//   update(
//     id: string,
//     username: string,
//     email: string,
//     profileImg: string
//   ): Observable<User> {
//     return this.httpClient
//       .put<ApiUser>(
//         `${this.apiUrl}/users/${id}`,
//         { username, email, profileImg },
//         { withCredentials: true }
//       )
//       .pipe(
//         map((apiUser) => this.mapApiUserToUser(apiUser)),
//         tap((user) => {
//           this._currentUser.set(user);
//           localStorage.setItem('currentUser', JSON.stringify(user));
//         })
//       );
//   }

//   getToken(): string {
//     return 'FAKE_TOKEN=12132';
//   }

//   //   refreshCurrentUser(): Observable<User> {
//   //     return this.httpClient
//   //       .get<ApiUser>(`${this.apiUrl}/profile`, {
//   //         withCredentials: true,
//   //       })
//   //       .pipe(
//   //         map((apiUser) => this.mapApiUserToUser(apiUser)),
//   //         tap((user) => {
//   //           this._currentUser.set(user);
//   //           localStorage.setItem('currentUser', JSON.stringify(user));
//   //         })
//   //       );
//   //   }

//   private mapApiUserToUser(apiUser: ApiUser): User {
//     return <User>{
//       id: apiUser._id,
//       username: apiUser.username,
//       email: apiUser.email,
//       profileImg: apiUser.profileImg || 'https://i.pravatar.cc/40',
//     };
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedIn.asObservable();

  saveUser(user: any) {
    localStorage.setItem('email', user.email);
    localStorage.setItem('username', user.username);
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('userId', user._id);
    localStorage.setItem(
      'profileImg',
      user.profileImg ?? 'https://i.pravatar.cc/40'
    );
    this.loggedIn.next(true);
  }

  clearUser() {
    localStorage.clear();
  }

  getUser(sth: string) {
    const curr = localStorage.getItem(sth);
    return curr ? curr : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  currentUser(): Observable<User> {
    const accessToken = this.getUser('accessToken');
    const currId = this.getUser('userId');

    if (!accessToken || !currId) {
      return new Observable<User>((observer) => {
        observer.error('No access token or user ID found.');
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      'X-Authorization': accessToken,
    });

    return this.http.get<User>(`http://localhost:3030/users/me`, {
      headers,
    });
  }

  register(
    username: string,
    email: string,
    password: string,
    profileImg: string
  ): Observable<User> {
    const body = { username, email, password, profileImg };
    return this.http
      .post<User>('http://localhost:3030/users/register', body)
      .pipe(tap((user) => this.saveUser(user)));
  }

  logout(): void {
    const accessToken = this.getUser('accessToken');
    this.clearUser();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);

    const headers = new HttpHeaders({
      'X-Authorization': accessToken || '',
    });

    this.http
      .get('http://localhost:3030/users/logout', {
        headers,
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          console.log(response.status);
        },
        error: (error) => {
          console.error('Logout failed:', error);
        },
      });
  }

  //   loadCurrentUserFromAPI(): void {
  //   const accessToken = this.getUser('accessToken');
  //   const headers = new HttpHeaders({
  //     'X-Authorization': accessToken || '',
  //   });

  //   this.http
  //     .get<User>('http://localhost:3030/users/me', { headers })
  //     .subscribe({
  //       next: (user) => {
  //         this.currentUserSubject.next(user);
  //       },
  //       error: (err) => {
  //         console.error('Failed to load user:', err);
  //       },
  //     });
  // }
}
