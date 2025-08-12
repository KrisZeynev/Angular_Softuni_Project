import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../models/book.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';
import { Output, EventEmitter } from '@angular/core';
import { BookService } from '../../core/services/book.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-book-details-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './book-details-card.html',
  styleUrls: ['./book-details-card.css'],
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
export class BookDetailsCard implements OnInit {
  @Input() book!: Book;
  @Output() favoriteRemoved = new EventEmitter<string>();
  @Output() bookDeleted = new EventEmitter<string>();

  isOwner: boolean = false;
  currentUserId: string | null = null;
  isFavorite: boolean = false;
  favoriteId: string = '';
  currAccessToken: string | null = null;

  constructor(
    private cd: ChangeDetectorRef,
    private favoritesService: FavoritesService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.currAccessToken = localStorage.getItem('accessToken');

    if (this.currentUserId && this.book && this.book._id) {
      this.bookService
        .getBookByOwnerAndId(this.currentUserId, this.book._id)
        .subscribe({
          next: (books) => {
            this.isOwner = books.length > 0;
            this.cd.detectChanges();
          },
          error: (err) => {
            console.error('Error:', err);
          },
        });

      this.favoritesService
        .getFavoriteByUserAndBook(this.currentUserId, this.book._id)
        .subscribe({
          next: (favorites) => {
            this.isFavorite = favorites.length > 0;
            this.favoriteId = favorites.length > 0 ? favorites[0]._id : '';
            this.cd.detectChanges();
          },
          error: (err) => {
            if (err.status !== 404) {
              console.error('Error fetching favorites:', err);
            }
          },
        });
    } else {
      console.log('Missing currentUserId or book._id');
    }
  }

  addToFavorites(): void {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('User is not authenticated!');
      return;
    }

    if (!this.isFavorite) {
      this.favoritesService
        .addToFavorites(this.book._id, accessToken)
        .subscribe({
          next: (res) => {
            this.isFavorite = true;
            this.favoriteId = res._id;
            this.cd.detectChanges();
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
            this.favoriteRemoved.emit(this.book._id);
            this.cd.detectChanges();
          },
          error: (err) => {
            console.error('Error removing from favorites:', err);
          },
        });
    }
  }

  deleteBook(): void {
    if (this.book._id && this.currAccessToken) {
      this.bookService
        .deleteBook(this.book._id, this.currAccessToken)
        .subscribe({
          next: () => {
            this.bookDeleted.emit(this.book._id); // emit event to parent
          },
          error: (err) => {
            console.error('Error deleting book', err);
          },
        });
    }
  }
}
