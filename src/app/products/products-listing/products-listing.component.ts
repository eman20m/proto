import { stringify } from '@angular/compiler/src/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/_model/product';
import { productCategory } from 'src/app/_model/product-category';
import { productCategoryService } from 'src/app/_services/product-category.service';
import { productService } from 'src/app/_services/product.services';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: ['./products-listing.component.scss']
})
export class ProductsListingComponent implements OnInit {
  @Output() productAdded=new EventEmitter <Product>();

  products:Product[]=[];
  categoryOfProducts:Product[]=[]
  baseProducts: Product[]=[]


  padgeNumpers:number[]=[];
  pageSize=9;
  currentPage=0;

  Category: productCategory[]=[]
  constructor(
    private productService:productService,
    private productCategoryService: productCategoryService

    ) {}

  ngOnInit(): void {
    //this.Category=this.productCategoryService.getAllGategory()
    this.productCategoryService.getAllGategory().subscribe(
      (response:productCategory[])=>{
        this.Category=response;
        console.log('category from backend: ',this.Category);
        
      },
      (error)=>{console.log(error);},
      ()=>{}
    );

    
    this.productService.getAllProducts().subscribe(
      (response)=>{
        this.products=response['product'];
        this.baseProducts=response['product'];
       
        this.calculateNumberOfPages(this.baseProducts.length)
        console.log('products from backend',this.baseProducts);
        
      },
      (error)=>{console.log(error);},
      ()=>{}
    );
    
  }
  
  calculateNumberOfPages(leng){
    this.padgeNumpers=[]
    for (let index = 0; index < leng/9; index++) {
      this.padgeNumpers.push(index+1)
      
    }
  }
 

  getSliceArrayOfProduct(): Product[]{
    const start=this.pageSize*this.currentPage;
    return this.products.slice(start,start+this.pageSize);
  }

//////////////////////////////////////////////////////////////////

  subscripFunction(object: Product):void{
    this.productAdded.emit(object);
  }

//////////////////////////////////////////////////////////////////////
  onSearchHandler(searchInput): void{
    let searchedProduct:Product[]=[]
    if (searchInput.value) {
      
      searchedProduct=this.productService.searchByName(this.products,searchInput.value);
      this.products=searchedProduct;
      this.calculateNumberOfPages(this.products.length);
    }
    else{
      searchedProduct=[]
      this.products=this.baseProducts;
      this.calculateNumberOfPages(this.baseProducts.length)
    }

    console.log('all base products',this.baseProducts)
    console.log('all products that in this.products',this.products)
    console.log('all products that search in',searchedProduct)
    console.log('search value: ',searchInput.value)
  }
//////////////////////////////////////////////////////////////////////////////

  sortByFeatcher(): void{
    this.productService.getAllProducts().subscribe(
      (response)=>{
        this.baseProducts=response['product']
        this.products=this.baseProducts
      }
    ),
   (err)=>{console.log(err);},
   ()=>{}
    
  }
///////////////////////////////////////////////////////////////////////////////

  sortByName(): void{
    for (let index = 0; index < this.products.length; index++) {
      this.products.sort((a, b) => (a.data[index].name > b.data[index].name) ? 1 : -1)   
    }

  }
//////////////////////////////////////////////////////////////////////////////

  sortByPriceLow(): void{
    for (let index = 0; index < this.products.length; index++) {
      this.products.sort((a, b) => (a.price-a.discount > b.price-b.discount) ? 1 : -1)
    }
  }
//////////////////////////////////////////////////////////////////////////////

  sortByPriceHigh(): void{
    for (let index = 0; index < this.products.length; index++) {
      this.products.sort((a, b) => (b.price-b.discount > a.price-a.discount) ? 1 : -1)
    }
  }
////////////////////////////////////////////////////////////////////////////////

  getProductsByCategoryId(id){

    this.categoryOfProducts=[];
    this.products=this.baseProducts;

    this.categoryOfProducts=this.productService.getProductsCategoryById(this.products,id)
  
    this.calculateNumberOfPages(this.categoryOfProducts.length)
    console.log('products searched by category',this.categoryOfProducts);
    this.products=this.categoryOfProducts
    console.log('passing product of determine category',this.products);
  }
}
