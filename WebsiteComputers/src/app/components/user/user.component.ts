import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public formUser = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email]) ],
    phone: ['', Validators.required],
    birthday: ['', Validators.required],
    gender: ['', Validators.required],
    // address: ['', Validators.required]
  });

  public formPassword = this.formBuilder.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  },
  {
    validator: this.confirmValidator('newPassword', 'confirmPassword')
  }
  );

  attributes = ['id', 'username', 'firstname', 'lastname', 'birthdate', 'email', 'phone', 'password', 'gender'];
  userData :any = [];

  constructor (private pageTitle: Title, private formBuilder: FormBuilder){
    pageTitle.setTitle('User');
    this.getDataFromSessionStorage();
  }

  getDataFromSessionStorage() {
    for (const attribute of this.attributes) {
      console.log(attribute, "This is attribute");
      console.log(sessionStorage.getItem(attribute), "This is session");
      this.userData[attribute] = sessionStorage.getItem(attribute);
    }
  }

  onSaveUser() {
    if (this.formUser.valid) {
      // Submit the form data to the server
      console.log(this.formUser.value);
    } else {
      // Display error message or handle invalid form
    }
  }
  
  confirmValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['passwordMismatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSavePassword() {
    if (this.formPassword.valid) {
      // Submit the form data to the server
      console.log(this.formPassword.value);
    } else {
      // Display error message or handle invalid form
    }
  }

  save(){
    
  }
}
