import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id: string;
  username: string;
  email: string;
  profileImg: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/id/${id}`);
  }

  updateUser(id: string, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/id/${id}`, data);
  }
}
