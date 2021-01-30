import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MyInterceptorService {

  constructor() { }
  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
    ): Observable<HttpEvent<any>>{
      const token=localStorage.getItem('token')
      let reqCloen;
      if(token){
        const headers=new HttpHeaders({
          authorization:token
        })
        reqCloen=req.clone({headers})
      }
      else{
        reqCloen=req
      }
      reqCloen=req.clone({headers: req.headers.append('authorization',token)})
      //req.headers.append('authorization',token)
     
      return next.handle(reqCloen)
    }
}
