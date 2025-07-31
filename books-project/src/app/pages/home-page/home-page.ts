import { Component } from '@angular/core';
import { BookDetailsCard } from '../../components/book-details-card/book-details-card';
import { Book } from '../../models/book.model'

@Component({
  selector: 'app-home-page',
  imports: [BookDetailsCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  books: Book[] = []; 

  constructor() {
    this.books = [
      { id: '1', title: 'Книга 1', author: 'Автор 1' },
      { id: '2', title: 'Книга 2', author: 'Автор 2', year: 2021 },
      { id: '3', title: 'Книга 3', author: 'Автор 3', year: 2021 },
      { id: '4', title: 'Книга 4', author: 'Автор 4', year: 2021 },
      { id: '5', title: 'Книга 5', author: 'Автор 5', year: 2021 },
      // { id: '6', title: 'Книга 6', author: 'Автор 6', year: 2021 },
      // { id: '7', title: 'Книга 7', author: 'Автор 7', year: 2021 },
    ];
  }
}
