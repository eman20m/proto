import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Product } from "../_model/product";

@Injectable()

export class productService{
    // private products: Product[]=[
        
    //         {id:1,data:[{name:'camera',description:"this is camera"}],price:2000,discount:200,category:{id:1},imagesUrls:['./assets/bg.jpg']},
    //         {id:2,data:[{name:'phone',description:"this is camera"}],price:1000,discount:100,category:{id:2},imagesUrls:['./assets/bg.jpg']},
    //         {id:3,data:[{name:'camera',description:"this is camera"}],price:800,discount:50,category:{id:3},imagesUrls:['./assets/bg.jpg']},
    //         {id:4,data:[{name:'camera',description:"this is camera"}],price:5000,discount:300,category:{id:4},imagesUrls:['./assets/bg.jpg']},
    //         {id:5,data:[{name:'camera',description:"this is camera"}],price:7000,discount:500,category:{id:5},imagesUrls:['./assets/bg.jpg']},
    //         {id:6,data:[{name:'phone',description:"this is camera"}],price:500,discount:20,category:{id:6},imagesUrls:['./assets/bg.jpg']},
    //         {id:7,data:[{name:'camera',description:"this is camera"}],price:9000,discount:1000,category:{id:7},imagesUrls:['./assets/bg.jpg']},
    //         {id:8,data:[{name:'camera',description:"this is camera"}],price:7000,discount:1000,category:{id:8},imagesUrls:['./assets/bg.jpg']},
    //         {id:9,data:[{name:'camera',description:"this is camera"}],price:600,discount:50,category:{id:9},imagesUrls:['./assets/bg.jpg']},
    //         {id:10,data:[{name:'camera',description:"this is camera"}],price:1000,discount:200,category:{id:10},imagesUrls:['./assets/bg.jpg']},
    //         {id:11,data:[{name:'phone',description:"this is camera"}],price:200,discount:0,category:{id:11},imagesUrls:['./assets/bg.jpg']},
    //         {id:12,data:[{name:'camera',description:"this is camera"}],price:900,discount:50,category:{id:12},imagesUrls:['./assets/bg.jpg']},
    //         {id:13,data:[{name:'camera',description:"this is camera"}],price:2000,discount:300,category:{id:13,name:'Arts & Crafts'},imagesUrls:['./assets/bg.jpg']}
          
    // ];

    products: Product[]=[]
    searchProducts: Product[]=[]
    searchProductsBycategory: Product[]=[]

    protectedAdd=new EventEmitter<Product>();
    productDetails=new EventEmitter<Product>();

    baseURL="https://mearn-stack-backend-test.herokuapp.com/"

    constructor(
        private httpClient: HttpClient
    ){}

    getAllProducts(){
        return this.httpClient.get(`${this.baseURL}product`)
    }

    getProductById(id){
        //return this.products.find(p => p.id===id);
        return this.httpClient.get(`${this.baseURL}product/${id}`)
    }

    addProduct(product:Product){
        let body={
            data:product.data,
            price:product.price,
            discount:product.discount,
            categoryId:product.categoryId,
            imagesUrls:product.imagesUrls
        }
        // const token=localStorage.getItem('token')
        // console.log(token);
        
        // const headers= new HttpHeaders({
        //     authorization:token
        // })
        // return this.httpClient.post(`${this.baseURL}product/add`,body,{headers,})
        
        return this.httpClient.post(`${this.baseURL}product/add`,body)
        
        // const id=this.products.length;
        // const newProduct: Product={id,data:product.data,price:product.price,discount:product.discount,categoryId:product.categoryId,tags:product.tags,imagesUrls:product.imagesUrls};
        // this.products.push(newProduct);
        // console.log(this.products)
    }

    updateProduct(product:Product){
        const index=this.products.findIndex(p => p.id===product.id);
        this.products[index]={id:product.id,data:product.data,price:product.price,discount:product.discount,categoryId:product.categoryId,tags:product.tags,imagesUrls:product.imagesUrls}
    }

    deleteProduct(id:number){
        const index=this.products.findIndex(p => p.id===id);
        this.products.splice(index,1)
    }

    searchByName(products:Product[],productName:string): Product[]{
        console.log(products)
        this.searchProducts=products.filter(p=>p.data[0].name.toLowerCase().includes(productName.toLowerCase()))
        return this.searchProducts
    }

    getProductsCategoryById(products:Product[],id){
        this.searchProductsBycategory=[]

        for (let index = 0; index < products.length; index++) {
            if (products[index].categoryId===id) {
              this.searchProductsBycategory.push(products[index])
            }
          }
       return this.searchProductsBycategory
    }
}