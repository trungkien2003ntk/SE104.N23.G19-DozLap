import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateDialogComponent } from './cate-dialog.component';

describe('CateDialogComponent', () => {
  let component: CateDialogComponent;
  let fixture: ComponentFixture<CateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
