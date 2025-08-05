import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-details-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './book-details-card.html',
  styleUrl: './book-details-card.css',
  standalone: true,
})
export class BookDetailsCard {
  @Input() book!: Book;

  isOwner: boolean = true

  addToFavorites(): void {
    console.log(`Book "${this.book.title}" added to favorites.`);
    console.log(`Book info ${this.book._id}`);
  }

  editBook(): void {
    console.log(`Book "${this.book.title}" added to favorites.`);
    console.log(`Book info ${this.book._id}`);
  }

  deleteBook(): void {
    console.log(`Book "${this.book.title}" added to favorites.`);
    console.log(`Book info ${this.book._id}`);
  }
}
