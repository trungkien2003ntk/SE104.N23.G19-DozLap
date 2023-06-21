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
      order_id: '',
      product_id: '',
      quantity: '',
      rate: '',
      comment:'',
    })
  }
  ngOnInit(): void {
//     this.empForm.patchValue({
//       order_id: this.data.order_id
//     });
//     console.log("this.data", this.data);
// console.log("data.order_id", this.data.order_id);
    // this._empService.getCateIdList().subscribe((categoryIds: number[]) => {
    //   this.categories = categoryIds;
    // });
    this.empForm.patchValue(this.data);
  }


  updateTotalPriceOrder(){
    this._empService.calculateOrderTotalPrice(this.data.order_id).subscribe(totalPrice => {
      this._empService.getShipFee(this.data.shipping_address_id).subscribe(fee => {
        if (totalPrice > 0)
          totalPrice += fee;
        console.log(totalPrice);
        this._empService.updateTotalPrice(this.data.order_id, totalPrice).subscribe(
          (response) => {

            // this._empService.getOrderById(this.orderId).subscribe(data => {
            //   this.thisOrder = data;
            // });
            // The request was successful
            console.log('Total price updated successfully:', response);
          },
          (error) => {
            // An error occurred
            console.error('Error updating total price:', error);
          }
        );
      });
    });
  }

  onFormSubmit(){
    if(this.empForm.valid)
    {
      console.log(this.empForm.value);
      if(this.data.order_id !==null && this.data.product_id == null){
        this._empService.addOrderDetail(this.empForm.value).subscribe({
          next: (val: any) => {
           this._coreService.openSnackBar('Order detail added successfully');
            this._dialogRef.close(true);

            this.updateTotalPriceOrder();
          },
          error: (err:any) => {
            console.error(err);
          }
        }) 
      }
      else{
        this._empService.updateOrderDetail(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Order detail updated!');
            this._dialogRef.close(true);

            this.updateTotalPriceOrder();
          },
          error: (err:any) => {
            console.error(err);
          }
        }) ;
      }
      
    }
  }
}


