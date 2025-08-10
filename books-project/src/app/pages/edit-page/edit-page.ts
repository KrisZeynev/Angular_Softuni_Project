import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book, Genre } from '../../models/book.model';
// import {
//   CreateBookService,
//   GetBookService,
// } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
// import { UpdateBookService } from '../../core/services/book.service';
import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-edit-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-page.html',
  styleUrl: './edit-page.css',
})
export class EditPage implements OnInit {
  bookForm: FormGroup;
  genresList: Genre[] = [
    'Action',
    'Fantasy',
    'Romance',
    'Thriller',
    'Biography',
  ];

  currentUserId: string | null = null;
  currAccessToken: string | null = null;

  currentYear = new Date().getFullYear();

  constructor(
    // private updateBookService: BookService,
    private location: Location,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    // private getBookService: BookService,
    private bookService: BookService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]+'),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]+'),
        ],
      ],
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z ]+'),
        ],
      ],
      publicationYear: [
        null,
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(this.currentYear),
        ],
      ],
      pages: [null, [Validators.required, Validators.min(1)]],
      isbn: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('[a-zA-Z0-9 ]+'),
        ],
      ],
      image: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  cancelEdit(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');
    this.currAccessToken = localStorage.getItem('accessToken');

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') || '';
      console.log('Book ID:', id);
      this.bookService.getBook(id).subscribe({
        next: (book) => {
          this.cd.detectChanges();
          console.log('Book:', book);
          this.bookForm.patchValue({
            title: book.title,
            description: book.description,
            author: book.author,
            publicationYear: book.publicationYear,
            pages: book.pages,
            isbn: book.isbn,
            image: book.image,
            genre: book.genre,
          });
        },
        error: (err) => {
          console.error('Error:', err);
        },
      });
    });
  }

  onSubmit(): void {
    console.log('edit data');
    const updatedData = this.bookForm.value;
    const bookId = this.route.snapshot.paramMap.get('id') || '';
    if (this.bookForm.invalid) {
      return;
    }
    if (this.currAccessToken && bookId) {
      //
      this.bookService.updateBook(bookId, updatedData, this.currAccessToken).subscribe({
      next: (res) => {
        console.log('Book updated successfully', res);
        this.location.back();
      },
      error: (err) => {
        console.error('Error updating book', err);
      },
    });
    }
  }
}
