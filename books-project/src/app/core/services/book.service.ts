import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class CreateBookService {
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

@Injectable({
  providedIn: 'root',
})
export class GetLatest5BooksService {
  private apiUrl = 'http://localhost:3030/data/books';

  constructor(private http: HttpClient) {}

  // getAllBooks(): Observable<any> {
  //   return this.http.get(this.apiUrl);
  // }

  getLastFiveBooks(): Observable<any> {
    const url = `${this.apiUrl}?sortBy=_createdOn%20desc&pageSize=5`;
    return this.http.get(url);
  }
}

@Injectable({
  providedIn: 'root',
})
export class GetAllBooksByCriteria {
  private apiUrl = 'http://localhost:3030/data/books';

  constructor(private http: HttpClient) {}

  // getAllBooks(): Observable<Book[]> {
  //   return this.http.get<Book[]>(this.apiUrl);
  // }

  searchBooks(field: string, term: any): Observable<Book[]> {
    const termString = String(term ?? '');
    const whereQuery = encodeURIComponent(`${field} LIKE "${termString}"`);
    const url = `${this.apiUrl}?where=${whereQuery}`;
    return this.http.get<Book[]>(url);
  }
}