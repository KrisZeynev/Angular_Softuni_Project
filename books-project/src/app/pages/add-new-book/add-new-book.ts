import { Component, ChangeDetectorRef } from '@angular/core';
import { Book, Genre } from '../../models/book.model';
// import { CreateBookService } from '../../core/services/book.service';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-book',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-book.html',
  styleUrl: './add-new-book.css',
})
export class AddNewBook {
  bookForm: FormGroup;
  genresList: Genre[] = [
    'Action',
    'Fantasy',
    'Romance',
    'Thriller',
    'Biography',
  ];

  currentYear = new Date().getFullYear();
  successMessage = false;
  errorMessage = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private cdr: ChangeDetectorRef
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
      // image: ['', [Validators.required, Validators.minLength(5), Validators.pattern('[a-zA-Z0-9 ]+')]],
      image: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  onGenreChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const genreArray = this.bookForm.get('genre') as FormArray;

    if (input.checked) {
      genreArray.push(this.fb.control(input.value as Genre));
    } else {
      const index = genreArray.controls.findIndex(
        (ctrl) => ctrl.value === input.value
      );
      genreArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const accessToken = localStorage.getItem('accessToken') || '';
    const isbn = this.bookForm.get('isbn')?.value;

    this.bookService.checkIfBookExists(isbn).subscribe({
      next: (exists) => {
        if (exists) {
          this.errorMessage = true;
          this.isSubmitting = false;
          this.cdr.detectChanges();

          setTimeout(() => {
            this.errorMessage = false;
            this.cdr.detectChanges();
          }, 1500);

        } else {
          const book: Book = this.bookForm.value;

          this.bookService.createBook(book, accessToken).subscribe({
            next: (response) => {
              console.log('Book created successfully', response);
              this.successMessage = true;
              this.cdr.detectChanges();

              setTimeout(() => {
                this.successMessage = false;
                this.isSubmitting = false;
                this.bookForm.reset();
              }, 1000);
            },
            error: (err) => {
              console.error('Error creating book', err);
              this.isSubmitting = false;
            },
          });
        }
      },
      error: (err) => {
        console.error('Error checking book existence', err);
        this.isSubmitting = false;
      },
    });
  }
}
