import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { productService } from './_services/product.services';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PaymentTypeService } from './_services/payment-type.service';
import { productCategoryService } from './_services/product-category.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { sharedModule } from './shared/dropdown/shared.module';
import { HomeComponent } from './home/home.component';
import { MyInterceptorService } from './_services/my-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    sharedModule
  ],
  providers: [productService,PaymentTypeService,productCategoryService,
    {provide: HTTP_INTERCEPTORS, useClass:MyInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
