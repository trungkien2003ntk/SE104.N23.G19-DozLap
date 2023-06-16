import { Component, Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-manu-dialog',
  templateUrl: './manu-dialog.component.html',
  styleUrls: ['./manu-dialog.component.css'],
  providers: [MessageService]
})
export class ManuDialogComponent implements OnInit {
  empForm: FormGroup;


  constructor(private _fb: FormBuilder,
     private _empService: ManufacturerService,
     private _dialogRef: MatDialogRef<ManuDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any,
     private _coreService: CoreService,
     private messageService: MessageService){
     this.empForm = _fb.group({
      name: '',
      description: '',
      displayOrder:'',
      picture: '', 
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
        this._empService.updateManu(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Manufacturer detail updated!');
            this._dialogRef.close(true);
          },
          error: (err:any) => {
            console.error(err);
          }
        }) ;
      }else{
        this._empService.addManu(this.empForm.value).subscribe({
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

  uploadedFiles: any[] = [];


    onUpload(event: any) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

}
