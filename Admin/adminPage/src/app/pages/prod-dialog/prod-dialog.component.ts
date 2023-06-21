import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-prod-dialog',
  templateUrl: './prod-dialog.component.html',
  styleUrls: ['./prod-dialog.component.css'],
  providers: [MessageService]
})
export class ProdDialogComponent implements OnInit {
  empForm: FormGroup;

  categories: number[] = [];


  constructor(private _fb: FormBuilder,
     private _empService: ManufacturerService,
     private _dialogRef: MatDialogRef<ProdDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService: CoreService,
     private messageService: MessageService){
     this.empForm = _fb.group({
      name: '',
      image_url: '',
      description: '',
      specs:'',
      price:'',
      status:'',
      category_id:'',
    })
  }
  ngOnInit(): void {
    this._empService.getCateIdList().subscribe((categoryIds: number[]) => {
      this.categories = categoryIds;
    });
    this.empForm.patchValue(this.data);
  }


  onFormSubmit(){
    if(this.empForm.valid)
    {
      console.log(this.empForm.value);
      if (this.data)
      {
        this._empService.updateProd(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Product detail updated!');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        }) ;
      }else{
        this._empService.addProd(this.empForm.value).subscribe({
          next: (val: any) => {
           this._coreService.openSnackBar('Product added successfully');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        }) 
      }
      
    }
  }

  uploadedFiles: any[] = [];


    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }
}

