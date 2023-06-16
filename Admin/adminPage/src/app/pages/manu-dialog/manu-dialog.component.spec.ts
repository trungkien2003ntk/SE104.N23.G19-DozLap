import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuDialogComponent } from './manu-dialog.component';

describe('ManuDialogComponent', () => {
  let component: ManuDialogComponent;
  let fixture: ComponentFixture<ManuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManuDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
