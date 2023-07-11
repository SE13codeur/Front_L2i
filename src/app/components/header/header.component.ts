import { Component, Input } from '@angular/core';
import { ISlide } from '@models/index';

interface BookMockModel {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() slides: ISlide[] = [];

  currentSlide = 0;
  books: BookMockModel[] = [
    {
      title: 'Practical MongoDB',
      subtitle: 'Architecting, Developing, and Administering MongoDB',
      isbn13: '9781484206485',
      price: '€32.04',
      image: 'https://itbook.store/img/books/9781484206485.png',
      url: 'https://itbook.store/books/9781484206485',
    },
    {
      title: 'The Definitive Guide to MongoDB, 3rd Edition',
      subtitle: 'A complete guide to dealing with Big Data using MongoDB',
      isbn13: '9781484211830',
      price: '€47.11',
      image: 'https://itbook.store/img/books/9781484211830.png',
      url: 'https://itbook.store/books/9781484211830',
    },
    {
      title: 'MongoDB in Action, 2nd Edition',
      subtitle: 'Covers MongoDB version 3.0',
      isbn13: '9781617291609',
      price: '€32.10',
      image: 'https://itbook.store/img/books/9781617291609.png',
      url: 'https://itbook.store/books/9781617291609',
    },
  ];

  private _currentIndex = 0;
  timeoutId?: number;
  backgroundImageUrl: string = this.books[0].image;

  ngOnInit(): void {
    this.resetTimer();
  }

  ngOnDestroy(): void {
    window.clearTimeout(this.timeoutId);
  }

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(index: number) {
    this._currentIndex = index;
    this.backgroundImageUrl = `url('${this.books[this._currentIndex].image}')`;
  }

  getCurrentSlideUrl(): string {
    const imageUrl = `url('${this.books[this.currentIndex].image}')`;
    this.backgroundImageUrl = imageUrl;
    return imageUrl;
  }

  resetTimer(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 7007);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.books.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.books.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }
}
