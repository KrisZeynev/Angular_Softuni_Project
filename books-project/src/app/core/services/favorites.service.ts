import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../../models/favorite.model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3030/data/favorites';

  constructor(private http: HttpClient) {}

  addToFavorites(bookId: string, accessToken: string): Observable<Favorite> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': accessToken,
    });

    const body = { bookId };

    return this.http.post<Favorite>(this.apiUrl, body, { headers });
  }

  getFavoriteByUserAndBook(
    userId: string,
    bookId: string
  ): Observable<Favorite[]> {
    const query = encodeURIComponent(
      `_ownerId="${userId}" and bookId="${bookId}"`
    );
    const url = `${this.apiUrl}?where=${query}`;
    return this.http.get<Favorite[]>(url);
  }

  getFavoriteByUserOnly(
    userId: string,
  ): Observable<Favorite[]> {
    const query = encodeURIComponent(
      `_ownerId="${userId}"`
    );
    const url = `${this.apiUrl}?where=${query}`;
    return this.http.get<Favorite[]>(url);
  }

  removeFromFavorites(
    favoriteId: string,
    accessToken: string
  ): Observable<void> {
    const headers = new HttpHeaders({
      'X-Authorization': accessToken,
    });

    return this.http.delete<void>(`${this.apiUrl}/${favoriteId}`, { headers });
  }
}
