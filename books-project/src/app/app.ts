import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { AboutPage } from './pages/about-page/about-page';
import { RegisterPage } from './pages/register-page/register-page';
import { LoginPage } from './pages/login-page/login-page';
import { BookDetailsCard } from './components/book-details-card/book-details-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage, Header, Footer, AboutPage, RegisterPage, LoginPage, BookDetailsCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('books-project');
}
