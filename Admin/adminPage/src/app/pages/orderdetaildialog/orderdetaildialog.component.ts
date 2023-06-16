import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-orderdetaildialog',
  templateUrl: './orderdetaildialog.component.html',
  styleUrls: ['./orderdetaildialog.component.css'],
  providers: [MessageService]
})

export class OrderdetaildialogComponent implements OnInit {
  empForm: FormGroup;

  // categories: number[] = [];


  constructor(private _fb: FormBuilder,
     private _empService: ManufacturerService,
     private _dialogRef: MatDialogRef<OrderdetaildialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService: CoreService,
     private messageService: MessageService){
     this.empForm = _fb.group({
      product_id: '',
      quantity: '',
      rate: '',
      comment:'',
    })
  }
  ngOnInit(): void {
    // this._empService.getCateIdList().subscribe((categoryIds: number[]) => {
    //   this.categories = categoryIds;
    // });
    this.empForm.patchValue(this.data);
  }


  onFormSubmit(){
    if(this.empForm.valid)
    {
      console.log(this.empForm.value);
      if (this.data)
      {
        this._empService.updateOrderDetail(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Order detail updated!');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        }) ;
      }else{
        this._empService.addOrderDetail(this.empForm.value).subscribe({
          next: (val: any) => {
           this._coreService.openSnackBar('Order detail added successfully');
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


