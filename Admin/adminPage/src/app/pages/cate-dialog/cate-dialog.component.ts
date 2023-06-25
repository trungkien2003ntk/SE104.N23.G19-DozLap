

import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cate-dialog',
  templateUrl: './cate-dialog.component.html',
  styleUrls: ['./cate-dialog.component.css']
})
export class CateDialogComponent implements OnInit {
  empForm: FormGroup;


  constructor(private _fb: FormBuilder,
     private _empService: ManufacturerService,
     private _dialogRef: MatDialogRef<CateDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService: CoreService){
     this.empForm = _fb.group({
      id:'',
      name: '',
      description: '',
      // displayOrder:'',
      // picture: '', 
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.empForm.valid)
    {
      //console.log(this.empForm.value);
      if (this.data)
      {
        this._empService.updateCate(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Category detail updated!');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        }) ;
      }else{
        this.empForm.get('id')?.setValue(1);
        this._empService.addCate(this.empForm.value).subscribe({
          next: (val: any) => {
           this._coreService.openSnackBar('Category added successfully');
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
