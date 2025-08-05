import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { GetAllBooksByCriteria } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalog-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
  standalone: true
})
export class CatalogPage implements OnInit {
  books: Book[] = [];
  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private getAllBooksByCriteria: GetAllBooksByCriteria
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      category: ['title', Validators.required],
      searchTerm: ['', Validators.required],
    });
  }

  onSearch(): void {
    console.log('search')
    if (this.searchForm.invalid) {
      return;
    }
    const { category, searchTerm } = this.searchForm.value;

    this.getAllBooksByCriteria
      .searchBooks(category, searchTerm)
      .subscribe({
        next: (data) => (this.books = data),
        error: (err) => console.error(err),
      });
  }

  onSubmit(): void {
    console.log('submit')
  }
}
