import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  public formUser = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.required],
    birthdate: ['', Validators.required],
    gender: ['', Validators.required],
  });

  public formPassword = this.formBuilder.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: this.confirmValidator('newPassword', 'confirmPassword'),
    }
  );

  attributes = [
    'id',
    'username',
    'firstName',
    'lastName',
    'birthdate',
    'email',
    'phone',
    'password',
    'gender',
  ];

  userData: any = {};

  constructor(
    private pageTitle: Title,
    private formBuilder: FormBuilder,
    private service: ApiServiceService
  ) {
    pageTitle.setTitle('User');
    this.getDataFromSessionStorage();
    console.log(this.userData, 'This is user data');
  }

  getDataFromSessionStorage() {
    for (const attribute of this.attributes) {
      this.userData[attribute] = sessionStorage.getItem(attribute);
    }
  }

  onSaveUser() {
    if (this.formUser.valid) {
      sessionStorage.setItem('firstName', this.userData.firstName);
      sessionStorage.setItem('lastName', this.userData.lastName);
      sessionStorage.setItem('email', this.userData.email);
      sessionStorage.setItem('phone', this.userData.phone);
      sessionStorage.setItem('birthdate', this.userData.birthdate);
      sessionStorage.setItem('gender', this.userData.gender);
      this.updateInfo();
    } else {
      alert('Invalid data.');
    }
  }

  confirmValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (
        matchingControl.errors &&
        !matchingControl.errors['passwordMismatch']
      ) {
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
      // Get the current password, new password, and confirm password from the form
      const currentPassword = this.formPassword.value.currentPassword;
      const newPassword = this.formPassword.value.newPassword;
      const confirmPassword = this.formPassword.value.confirmPassword;

      // Check if the new password and confirm password match
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
      }

      if (this.userData.password !== currentPassword) {
        alert('Current password is incorrect.');
        return;
      }

      // Update the user's password in the user data
      this.userData.password = newPassword;
      this.updateInfo();
      this.formPassword.reset();
      sessionStorage.setItem('password', this.userData.password);
    } else {
      alert('Invalid password.');
    }
  }

  updateInfo() {
    // Send the updated user data to the server
    console.log('This is userData', this.userData);
    this.service
      .putData('customer', this.userData.id, this.userData)
      .subscribe(() => {
        alert('Update successfully.');
      });
  }
}
