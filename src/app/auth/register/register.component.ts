import { Component, NgModule, OnInit } from '@angular/core';
import { Person } from 'src/app/_model/person';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  person: Person={email:"",password:""}
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    
  }
   onSubmit(): void{
    console.log(this.person)
    this.authService.register(this.person).subscribe(
      (response)=>{console.log(response);},
      (error)=>{console.log(error);
      },
      ()=>{}
    )
     
   }

}
