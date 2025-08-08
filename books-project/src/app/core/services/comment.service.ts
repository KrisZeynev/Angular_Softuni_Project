import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../models/comment.model';

const baseUrl = 'http://localhost:3030/data/book-comments';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentsByBookId(bookId: string): Observable<Comment[]> {
    const query = encodeURIComponent(`bookId="${bookId}"`);
    return this.http.get<Comment[]>(`${baseUrl}?where=${query}`);
  }

  postComment(bookId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(baseUrl, { bookId, text });
  }

  editComment(commentId: string, newText: string): Observable<Comment> {
    return this.http.patch<Comment>(`${baseUrl}/${commentId}`, { text: newText });
  }

  deleteComment(commentId: string): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/${commentId}`);
  }
}
