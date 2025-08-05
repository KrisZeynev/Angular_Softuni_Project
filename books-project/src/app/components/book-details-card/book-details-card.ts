import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Book } from '../../models/book.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckBookOwner } from '../../core/services/book.service';

@Component({
  selector: 'app-book-details-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './book-details-card.html',
  styleUrls: ['./book-details-card.css'],
  standalone: true,
})
export class BookDetailsCard implements OnInit {
  @Input() book!: Book;

  isOwner: boolean = false;
  currentUserId: string | null = null;

  constructor(
    private checkBookOwner: CheckBookOwner,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId');

    if (this.currentUserId && this.book && this.book._id) {
      this.checkBookOwner.getBookByOwnerAndId(this.currentUserId, this.book._id).subscribe({
        next: (books) => {
          this.isOwner = books.length > 0;
          this.cd.detectChanges();
          console.log('Book:', books);
          console.log('isOwner:', this.isOwner);
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    } else {
      console.warn('Missing currentUserId or book._id');
    }
  }

  addToFavorites(): void {
    console.log(`Book "${this.book.title}" added to favorites.`);
  }

  editBook(): void {
    console.log(`Edit book "${this.book.title}"`);
    console.log('isOwner:', this.isOwner);
  }

  deleteBook(): void {
    console.log(`Delete book "${this.book.title}"`);
    console.log('isOwner:', this.isOwner);
  }
}
