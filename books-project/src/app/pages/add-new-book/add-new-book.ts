import { Component } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../core/services/book.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-new-book',
  imports: [FormsModule],
  templateUrl: './add-new-book.html',
  styleUrl: './add-new-book.css',
})
export class AddNewBook {
  constructor(private bookService: BookService) {}

  book: Book = {
    id: '',
    title: '',
    description: '',
    author: '',
    genre: '',
    publicationYear: 0,
    pages: 0,
    isbn: '',
    image: '',
  };

  onSubmit() {
    const accessToken = localStorage.getItem('accessToken') || '';

    this.bookService.createBook(this.book, accessToken).subscribe({
      next: (response) => {
        console.log('Book created successfully', response);
      },
      error: (err) => {
        console.error('Error creating book', err);
      },
    });
  }
}
