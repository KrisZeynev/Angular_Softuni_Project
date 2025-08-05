import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetBookService } from '../../core/services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-details-page',
  imports: [],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.css',
})
export class BookDetailsPage implements OnInit {
  bookId!: string;
  currentBook!: Book;

  constructor(
    private route: ActivatedRoute,
    private getBookServ: GetBookService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id')!; // GetBookService
      this.getBookServ.getBook(this.bookId).subscribe({
        next: (book) => {
          console.log('Book data:', book);
          this.currentBook = book;
        },
        error: (err) => {
          console.log('error fetching book');
        },
      });
      console.log('Book ID from URL:', this.bookId);
    });
  }

  // getUser(): void {
  //   console.log('test details');
  // }
}
