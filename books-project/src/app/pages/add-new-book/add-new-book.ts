import { Component } from '@angular/core';
import { Book, Genre } from '../../models/book.model';
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
    title: '',
    description: '',
    author: '',
    genre: [],
    publicationYear: 0,
    pages: 0,
    isbn: '',
    image: '',
  };

  genresList: Genre[] = ['Action', 'Fantasy', 'Romance', 'Thriller', 'Biography'];

  onGenreChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.checked) {
    if (!this.book.genre.includes(input.value as Genre)) {
      this.book.genre.push(input.value as Genre);
    }
  } else {
    this.book.genre = this.book.genre.filter(g => g !== input.value);
  }
}

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
