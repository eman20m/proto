import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { productCategoryService } from 'src/app/_services/product-category.service';
import { productService } from 'src/app/_services/product.services';
import {Product } from "../../_model/product"

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.scss']
})
export class ProductItemsComponent implements OnInit {
  @Input() product:Product;
  //@Output() addItem=new EventEmitter <Product>();
  
  constructor( 
    private productService:productService,
    private protectedCategoryService:productCategoryService
    ) { 
    this.product={id:1,data:[{name:'camera',description:'this is camera'}],price:2000,discount:200,imagesUrls:['./assets/bg.jpg']}
  }

  ngOnInit(): void {
   
  }
  
  addToCart():void{
    //this.addItem.emit(this.product);
    this.productService.protectedAdd.emit(this.product)
   
  }

}
