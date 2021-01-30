import { Component } from '@angular/core';
import { Product } from './_model/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  productArray:Product[]=[];

  addedToCartAtHeader(product:Product){
    console.log(product)
    this.productArray.push(product);
  }
}
