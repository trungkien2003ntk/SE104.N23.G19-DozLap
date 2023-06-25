import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css'],
  providers: [MessageService]
})

export class OrderDialogComponent implements OnInit {
  empForm: FormGroup;

  // categories: number[] = [];


  constructor(private _fb: FormBuilder,
     private _empService: ManufacturerService,
     private _dialogRef: MatDialogRef<OrderDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService: CoreService,
     private messageService: MessageService){
     this.empForm = _fb.group({
      id:'',
      note: '',
      created_on_utc: '',
      customer_id: '',
      shipping_address_id:'',
      total_price:'',
      status:'',
      category_id:'',
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
        this._empService.updateOrder(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Order detail updated!');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        }) ;
      }else{
        this.empForm.get('id')?.setValue(1);
        this._empService.addOrder(this.empForm.value).subscribe({
          next: (val: any) => {
           this._coreService.openSnackBar('Order added successfully');
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


