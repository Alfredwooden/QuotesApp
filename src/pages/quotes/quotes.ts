import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';

import { Quote } from '../../data/quote.interface'
import quotes from '../../data/quotes';
import { QuotesServices } from '../../services/quotes';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {
  quoteGroup: {category : string, quotes: Quote[], icon: string}[];

  constructor( 
    private navParams : NavParams, 
    private alertCtrl : AlertController, 
    private quotesService : QuotesServices){}

  ngOnInit(){
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorites(selectedQuote : Quote){
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: ' Are you sure?',
      message: 'Are you sure you want to add the quote?', 
      buttons:[
        {
          text:'Yes, go ahead',
          handler:() => {
            console.log('Ok');
            this.quotesService.addQuoteToFavorite(selectedQuote);
          },
        },
        {
          text: 'No, I changed my mind!',
          role:'cancel',

          handler: () => {            
            console.log('Cancelled!')
          }

        }
      ]
    });

    alert.present();
  }

  onRemoveFromFavorites(quote : Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote : Quote){
    return this.quotesService.isQuoteFavorite(quote);
  }


  // ionViewDidLoad() {
  //   this.quoteGroup = this.navParams.data;
  // Add elvis operator (?) in template to use this approach
  // }

}
