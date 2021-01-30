import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_model/product';
import { productCategoryService } from 'src/app/_services/product-category.service';
import { productService } from 'src/app/_services/product.services';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product

  products: Product[]=[];
  relatedProducts: Product[]=[];
  constructor(
    private productService:productService,
    private activatedProduct:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product={data:[{name:"",description:""}],categoryId:{},imagesUrls:[],tags:[]}
    let id;
    
    /////////////////////////////
    this.activatedProduct.params.subscribe(
      (params)=>{
        id=params.id;
        this.productService.getProductById(id).subscribe(
          (response:Product)=>{
            console.log('product details',response);
            this.product=response
            console.log(this.product.categoryId.name);
            
            
            this.productService.getAllProducts().subscribe(
              (response)=>{
                console.log('all products',response);
                this.products=response['product']
    
                //get related product by category
                //this.relatedProducts=this.productService.getProductsCategoryById(this.products,id)
                this.relatedProducts=this.products.slice(1,5)
                console.log('related product by category',this.relatedProducts);
                
              },
              (err)=>{console.log(err);},
              ()=>{}
            );

          },
          (err)=>{console.log(err);},
          ()=>{}
        );

        
      },
      (err)=>{console.log(err);},
      ()=>{}
    )
    
  }
  
  addToCart():void{
    //this.addItem.emit(this.product);
    this.productService.protectedAdd.emit(this.product)
   
  }
}
