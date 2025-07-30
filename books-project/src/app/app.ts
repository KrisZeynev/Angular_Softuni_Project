import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { AboutPage } from './pages/about-page/about-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomePage, Header, Footer, AboutPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('books-project');
}
