import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-details-card',
  imports: [],
  templateUrl: './book-details-card.html',
  styleUrl: './book-details-card.css'
})
export class BookDetailsCard {
  @Input() book!: Book;
}
