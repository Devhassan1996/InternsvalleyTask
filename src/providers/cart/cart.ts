import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DisplayWhen } from 'ionic-angular/umd';

@Injectable()
export class CartProvider {
  total: number = 0;
  cart: any[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }

  addToCart(product: any) {
    //get category name;
    let cat = this.getCatName(product);
    //check if the cat is there and get position;
    let catPosition = this.cart.findIndex((obj) => {
      return obj.category === cat;
    });
    //push product;
    //if catPosition > -1 then the cat is there;
    product.quantity = 1;
    if (catPosition > -1) {
      this.cart[catPosition].products.push(product);
    } else {
      this.cart.push({
        category: cat,
        products: [product]
      });
    }
    //calculate total price;
    this.total += parseFloat(product.prices.price);
    console.log(this.cart);
  }

  removeFromCart(product:any) {
   //get the category
    let cat = this.getCatName(product);
    //get the category position 
    let catPosition = this.cart.findIndex((obj) => {
      return obj.category === cat;
    });
    //get product position;
    let proPosition = this.cart[catPosition].products.findIndex((obj => {
      return obj.id === product.id
    }));
    //delete product;
    this.cart[catPosition].products.splice(proPosition, 1);
    //if the product is the last product then delete the category object;
    if (this.cart[catPosition].products.length==0) {
      this.cart.splice(catPosition, 1);
    }
    console.log(this.cart)
    //calcaulate total price;
    this.total -= parseFloat(product.prices.price)*product.quantity;
  }

  editCart(product, operation) {
    //get category name;
    let cat = this.getCatName(product);
    //check if the cat is there and get position;
    let catPosition = this.cart.findIndex((obj) => {
      return obj.category === cat;
   });

    //get product position;
    let proPosition = this.cart[catPosition].products.findIndex((obj => {
      return obj.id === product.id
    }));

    let productData =  this.cart[catPosition].products[proPosition];

    switch (operation) {
      case 'add':
        productData.quantity += 1;
        if(productData.units[0].maxQty < productData.quantity) {
          productData.quantity -= 1;
          alert ('You reached the max quantity!');
        } else {
          this.cart[catPosition].products[proPosition] = productData;
          this.total += parseFloat(product.prices.price);
        }
        break;
      case 'remove':
        productData.quantity -= 1;
        if(productData.quantity < 1) {
          productData.quantity += 1;
          alert ('You reached the min quantity!');
        } else {
          this.cart[catPosition].products[proPosition] = productData;
          this.total -= parseFloat(product.prices.price);
        }
        break;
      default:
        break;
    }
    //display product quantity
    return product.quantity
  }
  getCatName(product: any) {
    //get last hierarchial category full name;
    let fullCategory: string = product.hierarchicalCategories[Object.keys(product.hierarchicalCategories).pop()];
    //indecate the indexOfLast ">";
    let sliceStartIndex = fullCategory.lastIndexOf('>');
    //get the category name;
    let category = fullCategory.slice(sliceStartIndex + 2, fullCategory.length);
    //return the category name;
    return category;
   }
   isBought(product:any){
      //get the category
      let cat = this.getCatName(product);
      //get the category position 
      let catPosition = this.cart.findIndex((obj) => {
        return obj.category === cat;
      });
      if(catPosition === -1) {
        return false;
      } 
      //get product position;
      let proPosition = this.cart[catPosition].products.findIndex((obj => {
        return obj.id === product.id
      }));

      if (proPosition > -1) {
        return true;
      } else {
        return false;
      }
   }
}
