import { Pipe, PipeTransform } from '@angular/core';

interface TranslationMap {
  [key: string]: { [key: string]: string };
}

const translations: TranslationMap = {
  en: {
    'En attente de confirmation': 'Awaiting confirmation',
    Confirmé: 'Confirmed',
    'En cours de livraison': 'In delivery',
    Livré: 'Delivered',
    'Veuillez effectuer une première commande !': 'Please make a first order!',
    'Voir les détails': 'See details',
  },
  fr: {
    'Awaiting confirmation': 'En attente de confirmation',
    Confirmed: 'Confirmé',
    'In delivery': 'En cours de livraison',
    Delivered: 'Livré',
    'Please make a first order!': 'Veuillez effectuer une première commande !',
    'See details': 'Voir les détails',
  },
};

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  transform(value: string, lang: string = 'en'): string {
    if (!value) return '';

    const langTranslations = translations[lang];
    return langTranslations && langTranslations[value]
      ? langTranslations[value]
      : value;
  }
}
