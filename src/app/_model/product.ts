import { paymentType } from "./payment-type";
import { productCategory } from "./product-category";
import { productLang } from "./product-lang";
import { tag } from "./tag";

export interface Product{
    _id?:string
    id?:number,
    data:productLang[],
    price?:number,
    discount?:number,
    imagesUrls?:string[],
    paymentTypes?:paymentType[],
    categoryId?:productCategory,
    tags?: tag[]
}