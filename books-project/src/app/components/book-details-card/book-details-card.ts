import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../models/book.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { CheckBookOwner } from '../../core/services/book.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { Output, EventEmitter } from '@angular/core';
// import { DeleteBookService } from '../../core/services/book.service';
import { BookService } from '../../core/services/book.service';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

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
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
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
    // private checkBookOwner: BookService,
    private cd: ChangeDetectorRef,
    private favoritesService: FavoritesService,
    // private deleteService: BookService,
    private bookService: BookService,
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
            // console.log('Book:', books);
            // console.log('isOwner:', this.isOwner);
            // console.log('isFavorite:', this.isFavorite);
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

            // console.log(`Book favorites id ${this.favoriteId}`);
            // console.log('isFavorite:', this.isFavorite);

            this.cd.detectChanges();
          },
          error: (err) => {
            if (err.status !== 404) {
              // not added to favorites yet
              console.error('Error fetching favorites:', err);
            }
            // console.error('Error fetching favorites:', err);
          },
        });
    } else {
      console.warn('Missing currentUserId or book._id');
    }

    // console.log(`Book favorites id ${this.favoriteId}`);
    // console.log('isOwner:', this.isOwner);
    // console.log('isFavorite:', this.isFavorite);
  }

  addToFavorites(): void {
    // console.log(`Book "${this.book.title}" added to favorites.`);
    // console.log(`Book favorites id ${this.favoriteId}`);
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('User is not authenticated!');
      return;
    }

    console.log(`isFavorite: ${this.isFavorite}`);

    if (!this.isFavorite) {
      this.favoritesService
        .addToFavorites(this.book._id, accessToken)
        .subscribe({
          next: (res) => {
            this.isFavorite = true;
            this.favoriteId = res._id;
            console.log(`Book "${this.book.title}" added to favorites.`, res);
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
            console.log(
              `Book "${this.book.title}" removed from favorites.`,
              res
            );
            this.favoriteRemoved.emit(this.book._id);
            this.cd.detectChanges();
          },
          error: (err) => {
            console.error('Error removing from favorites:', err);
          },
        });
    }
  }

  // editBook(): void {
  //   console.log(`Edit book "${this.book.title}"`);
  //   console.log('isOwner:', this.isOwner);
  // }

  deleteBook(): void {
    console.log(`Delete book "${this.book.title}"`);
    console.log('isOwner:', this.isOwner);

    if (this.book._id && this.currAccessToken) {
      this.bookService
        .deleteBook(this.book._id, this.currAccessToken)
        .subscribe({
          next: () => {
            console.log('Book deleted successfully');
            this.bookDeleted.emit(this.book._id); // emit event to parent
          },
          error: (err) => {
            console.error('Error deleting book', err);
          },
        });
    }
  }
}
