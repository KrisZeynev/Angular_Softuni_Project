// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import {
//   CheckBookOwner,
//   GetBookService,
// } from '../../core/services/book.service';
// import { Book } from '../../models/book.model';
// import { ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-book-details-page',
//   imports: [CommonModule],
//   templateUrl: './book-details-page.html',
//   styleUrl: './book-details-page.css',
// })
// export class BookDetailsPage implements OnInit {
//   bookId!: string;
//   currentBook!: Book;

//   isOwner: boolean = false;
//   currentUserId: string | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private getBookServ: GetBookService,
//     private cdr: ChangeDetectorRef,
//     private checkBookOwner: CheckBookOwner,
//     private cd: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.currentUserId = localStorage.getItem('userId');

//     this.route.paramMap.subscribe((params) => {
//       this.bookId = params.get('id')!;

//       // get current book data
//       this.getBookServ.getBook(this.bookId).subscribe({
//         next: (book) => {
//           console.log('Book data:', book);
//           this.currentBook = book;
//           this.cdr.detectChanges();
//         },
//         error: (err) => {
//           console.log('error fetching book');
//         },
//       });
//       console.log('Book ID from URL:', this.bookId);

//       // check if is owner
//       if (this.currentUserId && this.bookId) {
//         this.checkBookOwner.getBookByOwnerAndId(this.currentUserId, this.bookId).subscribe({
//           next: (books) => {
//             this.isOwner = books.length > 0;
//             console.log('Books found for owner:', books);
//             console.log('isOwner:', this.isOwner);
//             this.cdr.detectChanges();
//           },
//           error: (err) => {
//             console.error('Error checking owner:', err);
//           }
//         })

//     });
//   }
// }

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CheckBookOwner,
  GetBookService,
} from '../../core/services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';

@Component({
  selector: 'app-book-details-page',
  imports: [CommonModule],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.css',
  standalone: true,
})
export class BookDetailsPage implements OnInit {
  bookId!: string;
  currentBook!: Book;

  isOwner: boolean = false;
  currentUserId: string | null = null;
  isFavorite: boolean = false;
  favoriteId: string = '';

  constructor(
    private route: ActivatedRoute,
    private getBookServ: GetBookService,
    private checkBookOwner: CheckBookOwner,
    private cdr: ChangeDetectorRef,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');

    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id')!;

      // get current book data
      this.getBookServ.getBook(this.bookId).subscribe({
        next: (book) => {
          console.log('Book data:', book);
          this.currentBook = book;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log('error fetching book', err);
        },
      });

      // check if is owner
      if (this.currentUserId && this.bookId) {
        this.checkBookOwner
          .getBookByOwnerAndId(this.currentUserId, this.bookId)
          .subscribe({
            next: (books) => {
              this.isOwner = books.length > 0;
              console.log('isOwner:', this.isOwner);
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
              console.error('Error checking favorites:', err);
            },
          });
      }
    });
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
        .addToFavorites(this.currentBook._id, accessToken)
        .subscribe({
          next: (res) => {
            this.isFavorite = true;
            this.favoriteId = res._id;
            console.log(
              `Book "${this.currentBook.title}" added to favorites.`,
              res
            );
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
            console.log(
              `Book "${this.currentBook.title}" removed from favorites.`,
              res
            );
            // this.favoriteRemoved.emit(this.currentBook._id);
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error removing from favorites:', err);
          },
        });
    }
  }
  // addToFavorites(): void {
  //   console.log('add to favorites ')
  //   console.log(`isOwner: ${this.isOwner}`)
  //   console.log(`currentUserId: ${this.currentUserId}`)
  //   console.log(`isFavorite: ${this.isFavorite}`)
  //   console.log(`favoriteId: ${this.favoriteId}`)
  // }
}
