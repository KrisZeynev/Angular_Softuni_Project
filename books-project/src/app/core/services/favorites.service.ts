import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3030/data/favorites';

  constructor(private http: HttpClient) {}

  addToFavorites(bookId: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': accessToken,
    });

    const body = { bookId };

    return this.http.post(this.apiUrl, body, { headers });
  }

  getFavoriteByUserAndBook(userId: string, bookId: string): Observable<any[]> {
    const query = encodeURIComponent(
      `_ownerId="${userId}" and bookId="${bookId}"`
    );
    const url = `${this.apiUrl}?where=${query}`;
    return this.http.get<any[]>(url);
  }

    removeFromFavorites(favoriteId: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'X-Authorization': accessToken
    });

    return this.http.delete(`${this.apiUrl}/${favoriteId}`, { headers });
  }
}
