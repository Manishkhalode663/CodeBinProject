import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
 

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule ,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private authService:AuthService,private router: Router){}
reset(regForm:NgForm) { 
  regForm.reset();
 
}
register(regForm:NgForm) {

 this.authService.registerUser(regForm.value.email,regForm.value.password)

}
    

}
