import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public cartPrvd: CartProvider) {

  }

  addToCart(product) {
    this.cartPrvd.addToCart(product);
  }

  removeFromCart(product) {
    this.cartPrvd.removeFromCart(product);
  }

  IsBought(product){
    return this.cartPrvd.isBought(product);
  }
  addQuantity(product){
    this.cartPrvd.editCart(product,'add');
    
  }
  removeQuantity(product){
    this.cartPrvd.editCart(product,'remove');
  }
}
