import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../models/book.model';
import { GetAllBooksByCriteria } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookDetailsCard } from '../../components/book-details-card/book-details-card';

@Component({
  selector: 'app-catalog-page',
  imports: [CommonModule, ReactiveFormsModule, BookDetailsCard],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
  standalone: true
})
export class CatalogPage implements OnInit {
  books: Book[] = [];
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private getAllBooksByCriteria: GetAllBooksByCriteria,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      category: ['title', Validators.required],
      searchTerm: ['', Validators.required],
    });
  }

  // onSubmit(): void {
  //   console.log('search')
  //   if (this.searchForm.invalid) {
  //     return;
  //   }
  //   const { category, searchTerm } = this.searchForm.value;

  //   this.getAllBooksByCriteria
  //     .searchBooks(category, searchTerm)
  //     .subscribe({
  //       next: (data) => {
  //         this.books = data
  //         this.cdr.detectChanges();
  //       }
  //       error: (err) => console.error(err),
  //     });
  // }

  // onSubmit(): void {
  //   console.log('submit')
  // }

  onSubmit(): void {
  if (this.searchForm.invalid) {
    console.log('Form invalid');
    return;
  }
  const { category, searchTerm } = this.searchForm.value;
  // const { category, searchTerm } = this.searchForm.value as { category: string; searchTerm: string };

  console.log('Searching books with', typeof category, typeof searchTerm);

  this.getAllBooksByCriteria.searchBooks(category, searchTerm).subscribe({
    next: (data) => {
      console.log('Books found:', data);
      this.books = data;
      this.cdr.detectChanges();
    },
    error: (err) => console.error(err),
  });
}

}
