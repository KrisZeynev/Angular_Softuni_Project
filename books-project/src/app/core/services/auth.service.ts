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
      user.profileImg ?? 'https://stanfordopticians.co.uk/wp-content/uploads/2016/04/default-profile.png'
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

  logoutHttpCall() {
  const accessToken = localStorage.getItem('accessToken') || '';
  const headers = new HttpHeaders({
    'X-Authorization': accessToken,
  });

  return this.http.get('http://localhost:3030/users/logout', {
    headers,
    observe: 'response',
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

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>('http://localhost:3030/users/login', { email, password })
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
}
