import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { CartProvider } from '../../providers/cart/cart';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  list: any = [];
 
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public api: ApiProvider, public loadingCtrl: LoadingController, public cart: CartProvider) {
    this.getList();
  }

  getList() {
    let loading = this.loadingCtrl.create({ content: "Getting List, Please wait..."});
    loading.present();
    this.api.getList().subscribe((res: any) => {
      this.list = res.products;
      loading.dismiss();
    })
  }
  addToCart(product) {
    this.cart.addToCart(product);
  }
  
  removeFromCart(product) {
    this.cart.removeFromCart(product);
  }
  IsBought(product){
    return this.cart.isBought(product);
  }
  
  goToCart(){
    this.navCtrl.push(HomePage);
  }
  addQuantity(product){
    this.cart.editCart(product,'add');
    
  }
  removeQuantity(product){
    this.cart.editCart(product,'remove');
  }
  quantity(product){
    return this.cart.editCart(product,'remove').product.quantity;
  }
}
