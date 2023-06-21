import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../services/auth.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router,
    private _coreService: CoreService) {
      sessionStorage.clear();

  }
  result: any;
  hide = true;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyCode(1).subscribe(item => {
        this.result = item;
        console.log(item);
        if (this.result.username === this.loginform.value.username
          && this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
            sessionStorage.setItem('username',this.result.id);
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error('Please contact Admin', 'InActive User');
            
          }
        } else {
          this.toastr.error('Invalid credentials');
          this._coreService.openSnackBar('The account information does not exist!', 'done');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
