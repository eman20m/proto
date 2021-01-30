import { productCategory } from "../_model/product-category";
import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { Product } from "../_model/product";

@Injectable()

export class productCategoryService {
  // private category:productCategory[]=[
  //   {id:"5eac38b30cfca15d7c804090",name:'Arts & Crafts'},
  //   {id:"5eac39170cfca15d7c804091",name:'Automotive'},
  //   {id:"5eac39270cfca15d7c804092",name:'Baby'},
  //   {id:"5eacc09bba43cd4b889f3d12",name:'Books'},
  //   {id:"5eacc0a4ba43cd4b889f3d13",name:'Eletronics'},
  //   {id:"5eaca319759c2d34f4663c42",name:"Women's Fashion"},
  //   {id:"5eacc0bfba43cd4b889f3d15",name:"Men's Fashion"},
  //   {id:"5eacc0a4ba43cd4b889f3d16",name:"Health & Household"},
  //   {id:"5eacc0cdba43cd4b889f3d17",name:"Home & Kitchen"},
  //   {id:"5eacc0d3ba43cd4b889f3d18",name:"Military Accessories"},
  //   {id:"5eacc0d9ba43cd4b889f3d19",name:"Movies & Television"},
  //   {id:"5eacc0deba43cd4b889f3d1a",name:"Sports & Outdoors"},
  //   {id:"5eacc0e3ba43cd4b889f3d1b",name:"Tools & Home Improvement"},
  //   {id:"5eacc0e8ba43cd4b889f3d1c",name:"Toys & Games"}
  // ];
  
  ////url of backend
  baseURL="https://mearn-stack-backend-test.herokuapp.com/"
  
  constructor(
    private httpClient: HttpClient
   
  ) { }
  

  getAllGategory() {
    return this.httpClient.get(`${this.baseURL}category`)
    //return this.category.slice()
  }

}