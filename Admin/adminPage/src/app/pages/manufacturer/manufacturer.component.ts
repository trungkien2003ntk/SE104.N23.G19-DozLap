import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ManufacturerService } from 'src/app/services/manufacturer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from 'src/app/core/core.service';
import { ManuDialogComponent } from '../manu-dialog/manu-dialog.component';


@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 
    'name', 
    'description', 
    'displayOrder',
    'picture',
    'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, 
    private _emService: ManufacturerService,
    private _coreService: CoreService) {}
  ngOnInit(): void {
    this.getManuList();
  }

  openAddEditManuForm()
  {
    const dialogRef = this._dialog.open(ManuDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getManuList();
         }
      }
    });
  }

  getManuList() {
    this._emService.getManuList().subscribe({
      next:  (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteManu(id: number) {
    this._emService.deleteManu(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Manufacturer deleted!', 'done');
        this.getManuList();
      },
      error: console.log,
    })
  }

  openEditForm(data: any)
  {
    const dialogRef = this._dialog.open(ManuDialogComponent, {
      data, 
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
         if (val){
          this.getManuList();
         }
      }
    });
  }
}
