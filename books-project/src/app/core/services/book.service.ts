import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';
import { of, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3030/data/books';

  constructor(private http: HttpClient) {}

  createBook(book: Book, accessToken: string): Observable<Book> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': accessToken,
    });

    return this.http.post<Book>(this.apiUrl, book, { headers });
  }

  updateBook(
    id: string,
    updatedData: Partial<Book>,
    accessToken: string
  ): Observable<Book> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': accessToken,
    });

    return this.http.patch<Book>(`${this.apiUrl}/${id}`, updatedData, {
      headers,
    });
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
    // return this.http.get<Book[]>(`${this.apiUrl}/${id}`);
  }

  getLastFiveBooks(): Observable<Book[]> {
    const url = `${this.apiUrl}?sortBy=_createdOn%20desc&pageSize=5`;
    return this.http.get<Book[]>(url);
  }

  getAllBooks(): Observable<Book[]> {
    const url = `${this.apiUrl}?sortBy=_createdOn%20desc`;
    return this.http.get<Book[]>(url);
  }

  searchBooks(field: string, term: any): Observable<Book[]> {
    const termString = String(term ?? '');
    const whereQuery = encodeURIComponent(`${field} LIKE "${termString}"`);
    const url = `${this.apiUrl}?where=${whereQuery}`;
    return this.http.get<Book[]>(url);
  }

  // searchBooksByNumber(field: string, term: any): Observable<Book[]> {
  searchBooksByNumber(field: string, term: string): Observable<Book[]> {
    const termString = String(term ?? '');
    const whereQuery = encodeURIComponent(`${field}="${termString}"`);
    const url = `${this.apiUrl}?where=${whereQuery}`;
    return this.http.get<Book[]>(url);
  }

  // checkIfBookExists(isbn: string): Observable<boolean> {
  //   const whereQuery = encodeURIComponent(`isbn="${isbn}"`);
  //   const url = `${this.apiUrl}?where=${whereQuery}`;

  //   return this.http.get<Book[]>(url).pipe(map((books) => books.length > 0));
  // }

  // checkIfBookExists(isbn: string, accessToken: string): Observable<boolean> {
  //   const headers = new HttpHeaders({
  //     'X-Authorization': accessToken,
  //   });

  //   const whereQuery = encodeURIComponent(`isbn="${isbn}"`);
  //   const url = `${this.apiUrl}?where=${whereQuery}`;

  //   return this.http
  //     .get<Book[]>(url, { headers })
  //     .pipe(map((books) => books.length > 0));
  // }
  checkIfBookExists(isbn: string, accessToken: string): Observable<boolean> {
  const headers = new HttpHeaders({
    'X-Authorization': accessToken,
  });

  const whereQuery = encodeURIComponent(`isbn="${isbn}"`);
  const url = `${this.apiUrl}?where=${whereQuery}`;

  return this.http.get<Book[]>(url, { headers }).pipe(
    map((books) => books.length > 0),
    catchError((err) => {
      console.warn('Check book existence failed, ISBN does not exist.', err);
      return of(false);
    })
  );
}

  getBookByOwnerAndId(
    currentUserId: string,
    bookId: string
  ): Observable<Book[]> {
    const whereQuery = `_ownerId="${currentUserId}" AND _id="${bookId}"`;
    const url = `${this.apiUrl}?where=${encodeURIComponent(whereQuery)}`;
    return this.http.get<Book[]>(url);
  }

  deleteBook(id: string, accessToken: string): Observable<void> {
    const headers = new HttpHeaders({
      'X-Authorization': accessToken,
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
