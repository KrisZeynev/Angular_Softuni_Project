import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3030/data/books';

  constructor(private http: HttpClient) {}

  createBook(book: Book, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': accessToken,
    });

    return this.http.post(this.apiUrl, book, { headers });
  }
}
