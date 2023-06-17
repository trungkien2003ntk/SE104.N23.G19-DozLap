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
    first_name: this.builder.control('', Validators.required),
    last_name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone_number: this.builder.control('', Validators.required),
    date_of_birth: this.builder.control('', Validators.required),
    gender: this.builder.control('male'),
  });
  
  users:any;

  constructor(private builder: FormBuilder, private router: Router, private service: AuthService){
    sessionStorage.clear();
  }

  proceedRegister() {
    this.service.getAll().subscribe((result) => {
      this.users = result;
      const { username, email, phone_number } = this.registerform.value;
      if (!this.checkDuplicate(username, email, phone_number)) {
        if (this.registerform.valid) {
          this.service.registerUser(this.registerform.value).subscribe(result => {
            this.router.navigate(['login']);
          });
        } else {
          console.log('username', this.registerform.value.username);
          console.log('first_name', this.registerform.value.first_name);
          console.log('last name', this.registerform.value.last_name);
          console.log('email', this.registerform.value.email);
          console.log('date', this.registerform.value.date_of_birth);
          console.log('phone', this.registerform.value.phone_number);
          console.log('gender', this.registerform.value.gender);
          alert('Please enter valid data.');
        }
      } else {
        alert('Account already registered!');
      }
    });
  }

  checkDuplicate(username: any, email: any, phone: any): boolean {
    // Check if any of the users have the same username, email, or phone number
    const duplicateUser = this.users.find((user:any) => user.username === username || user.email === email || user.phone_number === phone);
    return (duplicateUser != null);
  }
}
