import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-prod-dialog',
  templateUrl: './prod-dialog.component.html',
  styleUrls: ['./prod-dialog.component.css']
})
export class ProdDialogComponent implements OnInit {
  empForm: FormGroup;

  categories: string[] = [
    'Laptop',
    'Tablet',
    'Iphone',
    'SamSung',
    'Watch',
  ]


  constructor(private _fb: FormBuilder,
     private _empService: ManufacturerService,
     private _dialogRef: MatDialogRef<ProdDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService: CoreService){
     this.empForm = _fb.group({
      name: '',
      image: '',
      description: '',
      specs:'',
      price:'',
      status:'',
      category:'',
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
        this._empService.updateProd(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Manufacturer detail updated!');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        }) ;
      }else{
        this._empService.addProd(this.empForm.value).subscribe({
          next: (val: any) => {
           this._coreService.openSnackBar('Manufacturer added successfully');
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

