import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';
import { BookService } from '../../core/services/book.service';
import { Location } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommentService } from '../../core/services/comment.service';
import { Comment } from '../../models/comment.model';
import { CommentItem } from '../../components/comments/comment-item/comment-item';

@Component({
  selector: 'app-book-details-page',
  imports: [CommonModule, RouterModule, CommentItem],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.css',
  standalone: true,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '800ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class BookDetailsPage implements OnInit {
  bookId!: string;
  currentBook!: Book;
  comments: Comment[] = [];

  isOwner: boolean = false;
  currentUserId: string | null = null;
  isFavorite: boolean = false;
  favoriteId: string = '';
  currAccessToken: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private favoritesService: FavoritesService,
    private bookService: BookService,
    private location: Location,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.currAccessToken = localStorage.getItem('accessToken');

    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id')!;

      // get current book data
      this.bookService.getBook(this.bookId).subscribe({
        next: (book) => {
          this.currentBook = book;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log('error fetching book', err);
        },
      });

      // check if is owner
      if (this.currentUserId && this.bookId) {
        this.bookService
          .getBookByOwnerAndId(this.currentUserId, this.bookId)
          .subscribe({
            next: (books) => {
              this.isOwner = books.length > 0;
              this.cdr.detectChanges();
            },
            error: (err) => {
              console.error('Error checking owner:', err);
            },
          });

        // Check if book is in favorites
        this.favoritesService
          .getFavoriteByUserAndBook(this.currentUserId, this.bookId)
          .subscribe({
            next: (favorites) => {
              if (favorites.length > 0) {
                this.isFavorite = true;
                this.favoriteId = favorites[0]._id;
              } else {
                this.isFavorite = false;
                this.favoriteId = '';
              }
              this.cdr.detectChanges();
            },
            error: (err) => {
              if (err.status !== 404) {
                console.error('Error checking favorites:', err);
              }
            },
          });
      }

      if (this.currAccessToken) {
        this.commentService
          .getCommentsByBookId(this.currAccessToken, this.bookId)
          .subscribe({
            next: (res) => {
              this.comments = res;
              this.cdr.detectChanges();
            },
            error: (err) => {
              if (err.status !== 404) {
                console.error('Error posting a new comment:', err);
              }
            },
          });
      }
    });
  }

  addToFavorites(): void {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    if (!this.isFavorite) {
      this.favoritesService
        .addToFavorites(this.currentBook._id, accessToken)
        .subscribe({
          next: (res) => {
            this.isFavorite = true;
            this.favoriteId = res._id;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error adding to favorites:', err);
          },
        });
    } else {
      this.favoritesService
        .removeFromFavorites(this.favoriteId, accessToken)
        .subscribe({
          next: (res) => {
            this.isFavorite = false;
            this.favoriteId = '';
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error removing from favorites:', err);
          },
        });
    }
  }

  deleteBook(): void {
    if (this.currentBook._id && this.currAccessToken) {
      this.bookService
        .deleteBook(this.currentBook._id, this.currAccessToken)
        .subscribe({
          next: () => {
            this.location.back();
          },
          error: (err) => {
            console.error('Error deleting book', err);
          },
        });
    }
  }

  onCommentDeleted(commentId: string): void {
    this.comments = this.comments.filter((c) => c._id !== commentId);
  }
}
