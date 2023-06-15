import { Component } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerform = this.builder.group({
    username: this.builder.control('', Validators.required),
    firstname: this.builder.control('', Validators.required),
    lastname: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required),
    birthdate: this.builder.control('', Validators.required),
    gender: this.builder.control('male'),
  });
  
  users:any;

  constructor(private builder: FormBuilder, private router: Router, private service: AuthService){
    
  }

  proceedRegister() {
    this.service.getAll().subscribe((result) => {
      this.users = result;
      console.log('This is all users', this.users);
      const { username, email, phone } = this.registerform.value;
      if (!this.checkDuplicate(username, email, phone)) {
        if (this.registerform.valid) {
          this.service.registerUser(this.registerform.value).subscribe(result => {
            this.router.navigate(['login']);
          });
        } else {
          alert('Please enter valid data.');
        }
      } else {
        alert('Account already registered!');
      }
    });
  }

  checkDuplicate(username: any, email: any, phone: any): boolean {
    // Check if any of the users have the same username, email, or phone number
    const duplicateUser = this.users.find((user:any) => user.username === username || user.email === email || user.phone === phone);
    return (duplicateUser != null);
  }
}
