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
import { CheckBookOwner, GetBookService } from '../../core/services/book.service';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details-page',
  imports: [CommonModule],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.css',
})
export class BookDetailsPage implements OnInit {
  bookId!: string;
  currentBook!: Book;

  isOwner: boolean = false;
  currentUserId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private getBookServ: GetBookService,
    private checkBookOwner: CheckBookOwner,
    private cdr: ChangeDetectorRef
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
          console.log('error fetching book');
        },
      });

      // check if is owner
      if (this.currentUserId && this.bookId) {
        this.checkBookOwner.getBookByOwnerAndId(this.currentUserId, this.bookId).subscribe({
          next: (books) => {
            this.isOwner = books.length > 0;
            console.log('Books found for owner:', books);
            console.log('isOwner:', this.isOwner);
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error checking owner:', err);
          }
        });
      }
    });
  }
}
