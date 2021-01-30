import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StringPipePipe } from "../pipes/string-pipe.pipe";
import { AuthGuardService } from "../_services/auth-guard.service";
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductItemsComponent } from "./product-items/product-items.component";
import { ProductsListingComponent } from "./products-listing/products-listing.component";

@NgModule({
    declarations:[
        ProductItemsComponent,
        ProductsListingComponent,
        ProductDetailsComponent,
        AddProductComponent,
        StringPipePipe,
    ],
    exports:[],
    imports:[
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {path:'', children:[
                {path:'', component:ProductsListingComponent},
                {path:'edit/:id', component:AddProductComponent},
                {path:'add', component:AddProductComponent, canActivate:[AuthGuardService]},
                {path:'details/:id', component:ProductDetailsComponent}
            ]},
        ])
    ],
    providers:[]
})

export class productModule{}