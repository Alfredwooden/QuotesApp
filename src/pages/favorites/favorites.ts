import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';


import { Quote } from '../../data/quote.interface';
import { QuotesServices } from '../../services/quotes';

import { QuotePage } from '../quote/quote';
import { QuotesPage } from '../quotes/quotes';
import { SettingsService } from '../../services/settings';



@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})


export class FavoritesPage {
  
  quotes: Quote[];

  constructor(private quotesService: QuotesServices, private modalCtrl : ModalController,private settingsService: SettingsService){}

  ionViewWillEnter (){
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote (quote: Quote){
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((remove : boolean) => {
      if (remove){
        this.onRemoveFromFavorites(quote);
      }
    });
  }

  onRemoveFromFavorites(quote : Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
        const position = this.quotes.findIndex((quoteEl: Quote) => {
          return quoteEl.id == quote.id;
        });
        this.quotes.splice(position, 1);
  }

  getBackground(){
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

}
