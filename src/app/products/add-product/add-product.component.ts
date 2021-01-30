import { Component, Injectable, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { paymentType } from 'src/app/_model/payment-type';
import { Product } from 'src/app/_model/product';
import { productCategory } from 'src/app/_model/product-category';
import { PaymentTypeService } from 'src/app/_services/payment-type.service';
import { productCategoryService } from 'src/app/_services/product-category.service';
import { productService } from 'src/app/_services/product.services';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})



export class AddProductComponent implements OnInit {

  paymentTypes: paymentType[];
  category: productCategory[]=[]
  product: Product={data:[{name:"",description:""}],tags:[],imagesUrls:[],paymentTypes:[]}

  editMode:boolean=false;

  

  constructor
  (
    private productService: productService,
    private paymentTypeService:PaymentTypeService, 
    private productCategoryService:productCategoryService,
    private activatedRoute: ActivatedRoute
    ) {
   }

  ngOnInit(): void {
    let id;
    this.paymentTypes=[]
    this.editMode= this.activatedRoute.snapshot.url[1] &&
    this.activatedRoute.snapshot.url[1].path==='edit' && true;
    if (this.editMode) {
      const id=this.activatedRoute.snapshot.params.id;
      this.productService.getProductById(+id).subscribe(
        (res)=>{this.product=res['product']},
        ()=>{},
        ()=>{}
      )
    }
    // this.activatedRoute.params.subscribe(
    //   (prams)=>{
    //     id=prams.id;
    //     this.productService.getProductById(id).subscribe(
    //       (response)=>{
    //         console.log(response)
    //       },
    //       (err)=>{console.log(err);},
    //       ()=>{}
    //     )
    //   },
    //   (err)=>{console.log(err);},
    //   ()=>{}
    // )
    
    this.paymentTypes=this.paymentTypeService.getAllPaymentTypes();
    //this.category=this.productCategoryService.getAllGategory()

    //category from backend
    this.productCategoryService.getAllGategory().subscribe(
      (response:productCategory[])=>{
        this.category=response;
        console.log('category of added product',this.category);
        
      },
      (error)=>{console.log(error);},
      ()=>{}
    );
  }
  

  onSubmit(form): void{
    
    console.log(this.product)
    this.productService.addProduct(this.product).subscribe(
      (response)=>{console.log(response);},
      (error)=>{console.log(error);
      },
      ()=>{}
    )
  }

  onCheckBoxPressed(index){
    this.product.paymentTypes.push(this.paymentTypes[index])
    console.log(this.product);
    

  }

  addTag(tagInput: any): void{
    let id=this.product.tags.length
    this.product.tags.push({id,name:tagInput.value});
    tagInput.value= '';
  }
  
  removeOneTag(nameInput:any): void{
    for (let index = 0; index < this.product.tags.length; index++) {
        if(this.product.tags[index].name===nameInput){
          this.product.tags.splice(index,1)
        }
    }
  }

  clearAllTags(): void{
    this.product.tags=[];
  }


  textBoxDisabled:boolean=true
  toggle(){
    this.textBoxDisabled=!this.textBoxDisabled
  }

}
