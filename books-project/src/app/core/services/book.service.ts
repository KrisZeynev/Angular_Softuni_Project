import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../../models/book.model';

// Create Book Service
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

// Edit Book Service
@Injectable({
  providedIn: 'root',
})
export class UpdateBookService {
  private apiUrl = 'http://localhost:3030/data/books';

  constructor(private http: HttpClient) {}

  updateBook(id: string, updatedData: Partial<Book>, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': accessToken,
    });

    return this.http.patch(`${this.apiUrl}/${id}`, updatedData, { headers });
  }
}

// Get Book Data Service
@Injectable({
  providedIn: 'root',
})
export class GetBookService {
  private apiUrl = 'http://localhost:3030/data/books';

  constructor(private http: HttpClient) {}

  getBook(id: string): Observable<any> {
    return this.http.get<Book[]>(`${this.apiUrl}/${id}`);
  }
}

// Get the latest 5 books
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

// search for all books that match the criteria
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

  searchBooksByNumber(field: string, term: any): Observable<Book[]> {
    const termString = String(term ?? '');
    const whereQuery = encodeURIComponent(`${field}="${termString}"`);
    const url = `${this.apiUrl}?where=${whereQuery}`;
    return this.http.get<Book[]>(url);
  }
}

// check if book current user is owner of any book
@Injectable({
  providedIn: 'root',
})
export class CheckBookOwner {
  private baseUrl = 'http://localhost:3030/data/books';

  constructor(private http: HttpClient) {}

  getBookByOwnerAndId(
    currentUserId: string,
    bookId: string
  ): Observable<Book[]> {
    const whereQuery = `_ownerId="${currentUserId}" AND _id="${bookId}"`;
    const url = `${this.baseUrl}?where=${encodeURIComponent(whereQuery)}`;
    return this.http.get<Book[]>(url);
  }
}

// DeleteBookService
@Injectable({
  providedIn: 'root',
})
export class DeleteBookService {
  private apiUrl = 'http://localhost:3030/data/books';

  constructor(private http: HttpClient) {}

  deleteBook(id: string, accessToken: string): Observable<void> {
    const headers = new HttpHeaders({
      'X-Authorization': accessToken,
    });

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
