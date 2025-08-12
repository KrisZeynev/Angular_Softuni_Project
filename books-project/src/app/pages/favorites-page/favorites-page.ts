import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { BookDetailsCard } from '../../components/book-details-card/book-details-card';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  imports: [CommonModule, BookDetailsCard],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css',
  standalone: true,
})
export class FavoritesPage implements OnInit {
  currentUserId: string | null = null;
  favoritesBooks: Book[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private bookService: BookService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');

    if (this.currentUserId) {
      this.favoritesService
        .getFavoriteByUserOnly(this.currentUserId)
        .subscribe({
          next: (favorites) => {
            if (favorites.length === 0) {
              this.favoritesBooks = [];
              this.cd.detectChanges();
              return;
            }

            const bookObservables = favorites.map((fav) =>
              this.bookService.getBook(fav.bookId)
            );

            forkJoin(bookObservables).subscribe({
              next: (books) => {
                this.favoritesBooks = books;
                this.cd.detectChanges();
              },
              error: (err) => {
                console.error('Error fetching books:', err);
              },
            });
          },
          error: (err) => {
            console.error('Error fetching favorites:', err);
          },
        });
    }
  }

  onFavoriteRemoved(bookId: string): void {
    this.favoritesBooks = this.favoritesBooks.filter(
      (book) => book._id !== bookId
    );
  }
}
