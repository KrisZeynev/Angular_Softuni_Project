import { Component } from '@angular/core';
import { BookDetailsCard } from '../../components/book-details-card/book-details-card';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-home-page',
  imports: [BookDetailsCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  books: Book[] = [];

  constructor() {
    this.books = [
      // {
      //   // id: '1',
      //   title: 'The Great Gatsby',
      //   author: 'F. Scott Fitzgerald',
      //   genre: 'Classic',
      //   description:
      //     'A novel about the decline of the American Dream in the 1920s.',
      //   publicationYear: 1925,
      //   pages: 218,
      //   isbn: '9780743273565',
      //   image:
      //     'https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg',
      // },
      // {
      //   // id: '2',
      //   title: '1984',
      //   author: 'George Orwell',
      //   genre: 'Dystopian',
      //   description:
      //     'A chilling prophecy about the future and totalitarianism.',
      //   publicationYear: 1949,
      //   pages: 328,
      //   isbn: '9780451524935',
      //   image:
      //     'https://m.media-amazon.com/images/I/612ADI+BVlL._UF1000,1000_QL80_.jpg',
      // },
      // {
      //   // id: '3',
      //   title: 'To Kill a Mockingbird',
      //   author: 'Harper Lee',
      //   genre: 'Fiction',
      //   description: 'A novel about racial injustice in the Deep South.',
      //   publicationYear: 1960,
      //   pages: 281,
      //   isbn: '9780061120084',
      //   image:
      //     'https://m.media-amazon.com/images/I/81aY1lxk+9L.jpg',
      // },
      // {
      //   // id: '4',
      //   title: 'The Hobbit',
      //   author: 'J.R.R. Tolkien',
      //   genre: 'Fantasy',
      //   description:
      //     'A fantasy adventure that sets the stage for The Lord of the Rings.',
      //   publicationYear: 1937,
      //   pages: 310,
      //   isbn: '9780547928227',
      //   image:
      //     'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg',
      // },
      // {
      //   // id: '5',
      //   title: 'Pride and Prejudice',
      //   author: 'Jane Austen',
      //   genre: 'Romance',
      //   description: 'A classic romantic novel set in 19th-century England.',
      //   publicationYear: 1813,
      //   pages: 279,
      //   isbn: '9781503290563',
      //   image:
      //     'https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg',
      // },
    ];
  }
}
