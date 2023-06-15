import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  result: any;
  users:any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });
  
  constructor(private builder: FormBuilder, private service: AuthService,
    private router: Router) {
      sessionStorage.clear();
  }

  proceedLogin() {
    this.service.getAll().subscribe((result) => {
      this.users = result;

      if (this.loginform.valid) {
        this.service.getUserbyCode(this.getUserIdByUsername(this.loginform.value.username)).subscribe(item => {
          this.result = item;
          if (this.result.password === this.loginform.value.password) {
              sessionStorage.setItem('id',this.result.id);
              sessionStorage.setItem('username',this.result.username);
              sessionStorage.setItem('firstname',this.result.firstname);
              sessionStorage.setItem('lastname',this.result.lastname);
              sessionStorage.setItem('birthdate',this.result.birthdate);
              sessionStorage.setItem('email',this.result.email);
              sessionStorage.setItem('phone',this.result.phone);
              sessionStorage.setItem('password',this.result.password);
              sessionStorage.setItem('gender',this.result.gender);
              this.router.navigate(['']);
          } else {
            alert('Wrong password!');
          }
        });
      } else {
        alert('Please enter valid data.');
      }
    })
  }

  getUserIdByUsername(username: any): any{
    const user = this.users.find((u:any) => u.username === username);
    return user ? user.id : undefined;
  }
}
