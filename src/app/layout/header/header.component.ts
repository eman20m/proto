import { Component, DoCheck, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { productService } from 'src/app/_services/product.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartArray:Product[]=[];
  
  isOpend=false;

  
  constructor(private productService:productService) { 
    
  }

  ngOnInit(): void {
    this.productService.protectedAdd.subscribe(
      (res:any)=>{
        this.cartArray.push(res);
        console.log('products in cart: ',this.cartArray)
      },
      (err:any)=>{console.error(err);},
      (completed:any)=>{alert('completed');}
    )
  }

  
  getTotalCost(): number{
    let totalCost=0;
    for (const item of this.cartArray) {
      totalCost+=(item.price-item.discount);
    } 
    return totalCost
  }

  deletPoductFromCart(name): void{
    
    for (let index = 0; index < this.cartArray.length; index++) {
      if(this.cartArray[index].data[0].name===name){
        this.cartArray.splice(index,1)
      }
    }
    console.log('products in cart Now: ',this.cartArray)
  }

}
