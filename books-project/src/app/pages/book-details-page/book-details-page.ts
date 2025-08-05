import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetBookService } from '../../core/services/book.service';
import { Book } from '../../models/book.model';
import { ChangeDetectorRef } from '@angular/core';

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
    private getBookServ: GetBookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId = params.get('id')!;
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
      console.log('Book ID from URL:', this.bookId);
    });
  }
}
