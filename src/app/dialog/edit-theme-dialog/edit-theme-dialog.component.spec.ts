import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThemeDialogComponent } from './edit-theme-dialog.component';

describe('EditThemeDialogComponent', () => {
  let component: EditThemeDialogComponent;
  let fixture: ComponentFixture<EditThemeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditThemeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
