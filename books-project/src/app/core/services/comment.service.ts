import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment.model';

const baseUrl = 'http://localhost:3030/data/book-comments';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentById(
    accessToken: string,
    commentId: string
  ): Observable<Comment[]> {
    const query = encodeURIComponent(`_id="${commentId}"`);
    const headers = new HttpHeaders({
      'X-Authorization': accessToken,
    });

    return this.http.get<Comment[]>(`${baseUrl}?where=${query}`, { headers });
  }

  getCommentsByBookId(
    accessToken: string,
    bookId: string
  ): Observable<Comment[]> {
    const query = encodeURIComponent(`bookId="${bookId}"`);
    const headers = new HttpHeaders({
      'X-Authorization': accessToken,
    });

    return this.http.get<Comment[]>(`${baseUrl}?where=${query}`, { headers });
  }

  postComment(
    accessToken: string,
    bookId: string,
    text: string
  ): Observable<Comment> {
    const headers = new HttpHeaders({
      'X-Authorization': accessToken,
    });
    return this.http.post<Comment>(baseUrl, { bookId, text }, { headers });
  }

  editComment(
    accessToken: string,
    commentId: string,
    newText: string
  ): Observable<Comment> {
    const headers = new HttpHeaders({
      'X-Authorization': accessToken,
    });
    return this.http.patch<Comment>(
      `${baseUrl}/${commentId}`,
      { text: newText },
      { headers }
    );
  }

  deleteComment(accessToken: string, commentId: string): Observable<void> {
    const headers = new HttpHeaders({
      'X-Authorization': accessToken,
    });
    return this.http.delete<void>(`${baseUrl}/${commentId}`, { headers });
  }
}
