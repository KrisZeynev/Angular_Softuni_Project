import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookDetailsCard } from '../../components/book-details-card/book-details-card';
import { Book } from '../../models/book.model';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [BookDetailsCard, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookService.getLastFiveBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading books:', err);
      },
    });
  }

  onBookDeleted() {
    this.bookService.getLastFiveBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading books:', err);
      },
    });
  }
}
