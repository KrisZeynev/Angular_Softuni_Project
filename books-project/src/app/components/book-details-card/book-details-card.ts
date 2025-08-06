import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../models/book.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckBookOwner } from '../../core/services/book.service';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-book-details-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './book-details-card.html',
  styleUrls: ['./book-details-card.css'],
  standalone: true,
})
export class BookDetailsCard implements OnInit {
  @Input() book!: Book;

  isOwner: boolean = false;
  currentUserId: string | null = null;
  isFavorite: boolean = false;
  favoriteId: string = '';

  private apiUrl = 'http://localhost:3030/data/favorites';

  constructor(
    private checkBookOwner: CheckBookOwner,
    private cd: ChangeDetectorRef,
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');

    if (this.currentUserId && this.book && this.book._id) {
      this.checkBookOwner
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
            console.error('Error fetching favorites:', err);
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
            this.cd.detectChanges();
          },
          error: (err) => {
            console.error('Error removing from favorites:', err);
          },
        });
    }
  }

  editBook(): void {
    console.log(`Edit book "${this.book.title}"`);
    console.log('isOwner:', this.isOwner);
  }

  deleteBook(): void {
    console.log(`Delete book "${this.book.title}"`);
    console.log('isOwner:', this.isOwner);
  }
}
