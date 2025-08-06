import { Component } from '@angular/core';
import { Book, Genre } from '../../models/book.model';
import { CreateBookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-edit-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-page.html',
  styleUrl: './edit-page.css',
})
export class EditPage {
  bookForm: FormGroup;
  genresList: Genre[] = [
    'Action',
    'Fantasy',
    'Romance',
    'Thriller',
    'Biography',
  ];

  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder, private bookService: CreateBookService) {
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


  onSubmit(): void {
    console.log('edit data');
    
  }
}
