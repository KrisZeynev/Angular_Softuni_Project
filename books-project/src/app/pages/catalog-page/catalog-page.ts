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
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  private loadAllBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err),
    });
  }

  private searchBooks(category: string, searchTerm: string) {
    if (this.searchForm.invalid) {
      console.log('Form invalid');
      return;
    }
    // const { category, searchTerm } = this.searchForm.value;

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

  ngOnInit() {
    this.searchForm = this.fb.group({
      category: ['title', Validators.required],
      // searchTerm: ['', Validators.required],
      searchTerm: [''],
    });

    this.loadAllBooks();

    // // load all
    // this.searchForm.get('searchTerm')?.valueChanges.subscribe((value) => {
    //   if (!value.trim()) {
    //     this.loadAllBooks();
    //     this.cdr.detectChanges();
    //   }
    // });

    this.searchForm.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(({ category, searchTerm }) => {
      if (!searchTerm.trim()) {
        this.loadAllBooks();
      } else {
        this.searchBooks(category, searchTerm);
      }
    });
  }

  // onSubmit(): void {
    
  // }

  onBookDeleted(deletedBookId: string) {
    this.books = this.books.filter((book) => book._id !== deletedBookId);
  }
}
