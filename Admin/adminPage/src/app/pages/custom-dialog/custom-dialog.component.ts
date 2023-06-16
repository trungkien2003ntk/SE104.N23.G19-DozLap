import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';



@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css'],
  providers: [MessageService]
})

export class CustomDialogComponent implements OnInit {
  empForm: FormGroup;




  constructor(private _fb: FormBuilder,
     private _empService: ManufacturerService,
     private _dialogRef: MatDialogRef<CustomDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService: CoreService,
     private messageService: MessageService){
     this.empForm = _fb.group({
      username: '',
      password: '',
      email: '',
      first_name:'',
      last_name:'',
      gender:'',
      phone_number:'',
      date_of_birth:'',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }


  onFormSubmit(){
    if(this.empForm.valid)
    {
      console.log(this.empForm.value);
      if (this.data)
      {
        this._empService.updateCust(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Customer detail updated!');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        }) ;
      }else{
        this._empService.addCust(this.empForm.value).subscribe({
          next: (val: any) => {
           this._coreService.openSnackBar('Customer added successfully');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        }) 
      }
      
    }
  }
}



