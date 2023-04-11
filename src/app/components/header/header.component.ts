import { Component } from '@angular/core';

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
  currentSlide = 0;
  books: BookMockModel[] = [
    {
      title: 'Practical MongoDB',
      subtitle: 'Architecting, Developing, and Administering MongoDB',
      isbn13: '9781484206485',
      price: '$32.04',
      image: 'https://itbook.store/img/books/9781484206485.png',
      url: 'https://itbook.store/books/9781484206485',
    },
    {
      title: 'The Definitive Guide to MongoDB, 3rd Edition',
      subtitle: 'A complete guide to dealing with Big Data using MongoDB',
      isbn13: '9781484211830',
      price: '$47.11',
      image: 'https://itbook.store/img/books/9781484211830.png',
      url: 'https://itbook.store/books/9781484211830',
    },
    {
      title: 'MongoDB in Action, 2nd Edition',
      subtitle: 'Covers MongoDB version 3.0',
      isbn13: '9781617291609',
      price: '$32.10',
      image: 'https://itbook.store/img/books/9781617291609.png',
      url: 'https://itbook.store/books/9781617291609',
    },
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.books.length;
    this.updateSlide();
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.books.length) % this.books.length;
    this.updateSlide();
  }

  updateSlide() {
    const radioButton = document.getElementById(
      'carousel-' + (this.currentSlide + 1)
    ) as HTMLInputElement;
    if (radioButton) {
      radioButton.checked = true;
    }
  }
}
