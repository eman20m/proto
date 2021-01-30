import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', redirectTo: '',pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'product', loadChildren: () => import('src/app/products/product.module').then(m => m.productModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules, scrollPositionRestoration:"top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
