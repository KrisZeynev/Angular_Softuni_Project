export type Genre = 'Action' | 'Fantasy' | 'Romance' | 'Thriller' | 'Biography';

export interface Book {
  _id: string,
  title: string;
  description: string;
  author: string;
  genre: Genre[];
  publicationYear: number;
  pages: number;
  isbn: string;
  image: string;
}