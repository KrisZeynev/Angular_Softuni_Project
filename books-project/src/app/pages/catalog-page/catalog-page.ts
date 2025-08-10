import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../models/book.model';
// import { GetAllBooksByCriteria } from '../../core/services/book.service';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BookDetailsCard } from '../../components/book-details-card/book-details-card';

@Component({
  selector: 'app-catalog-page',
  imports: [CommonModule, ReactiveFormsModule, BookDetailsCard],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
  standalone: true,
})
export class CatalogPage implements OnInit {
  books: Book[] = [];
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      category: ['title', Validators.required],
      searchTerm: ['', Validators.required],
    });

    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      console.log('Form invalid');
      return;
    }
    const { category, searchTerm } = this.searchForm.value;
    // const { category, searchTerm } = this.searchForm.value as { category: string; searchTerm: string };

    console.log('Searching books with', category, typeof searchTerm);

    if (category === 'publicationYear' || category === 'pages') {
      this.bookService.searchBooksByNumber(category, searchTerm).subscribe({
        next: (data) => {
          console.log('Books found:', data);
          this.books = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.bookService.searchBooks(category, searchTerm).subscribe({
        next: (data) => {
          console.log('Books found:', data);
          this.books = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error(err),
      });
    }
  }

  onBookDeleted(deletedBookId: string) {
    this.books = this.books.filter((book) => book._id !== deletedBookId);
  }
}
