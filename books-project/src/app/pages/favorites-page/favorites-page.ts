// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { FavoritesService } from '../../core/services/favorites.service';
// import { Favorite } from '../../models/favorite.model';
// import { CommonModule } from '@angular/common';
// import { BookDetailsCard } from '../../components/book-details-card/book-details-card';


// @Component({
//   selector: 'app-favorites-page',
//   imports: [CommonModule, BookDetailsCard],
//   templateUrl: './favorites-page.html',
//   styleUrl: './favorites-page.css',
// })
// export class FavoritesPage implements OnInit {
//   currentUserId: string | null = null;
//   favoritesBooks: Favorite[] = []

//   constructor (private favoritesService: FavoritesService, private cd: ChangeDetectorRef,) {}
  
//   ngOnInit(): void {
//     console.log('favorite books');
//     this.currentUserId = localStorage.getItem('userId');
//     if (this.currentUserId) {
//       this.favoritesService.getFavoriteByUserOnly(this.currentUserId).subscribe({
//           next: (books) => {
//             console.log('Books:', books);
//             this.favoritesBooks = books;
//             this.cd.detectChanges();
//           },
//           error: (err) => {
//             console.error('Error:', err);
//           },
//         });
//     }
//   }
// }

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { GetBookService } from '../../core/services/book.service';
import { Favorite } from '../../models/favorite.model';
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
    private bookService: GetBookService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('Loading favorite books...');
    this.currentUserId = localStorage.getItem('userId');

    if (this.currentUserId) {
      this.favoritesService.getFavoriteByUserOnly(this.currentUserId).subscribe({
        next: (favorites) => {
          console.log('Favorites:', favorites);

          if (favorites.length === 0) {
            this.favoritesBooks = [];
            this.cd.detectChanges();
            return;
          }

          const bookObservables = favorites.map(fav => 
            this.bookService.getBook(fav.bookId)
          );

          forkJoin(bookObservables).subscribe({
            next: (books) => {
              console.log('Fetched Books:', books);
              this.favoritesBooks = books;
              this.cd.detectChanges();
            },
            error: (err) => {
              console.error('Error fetching books:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error fetching favorites:', err);
        }
      });
    }
  }

  onFavoriteRemoved(bookId: string): void {
  this.favoritesBooks = this.favoritesBooks.filter(book => book._id !== bookId);
}

}
