import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DeleteChapterComponent} from '../delete-dialog/delete-chapter.component';
import {OperType} from '../OperType';

@Component({
  selector: 'app-edit-theme-dialog',
  templateUrl: './edit-theme-dialog.component.html',
  styleUrls: ['./edit-theme-dialog.component.css']
})
export class EditThemeDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditThemeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType],
    private dialog: MatDialog
  ) { }

  dialogTitle: string;
  themeTitle: string;
  operType: OperType;
  //canDelete = true;

  ngOnInit(): void {
    this.themeTitle = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];
   // if(!this.themeTitle){
   //   this.canDelete = false;
   // }
  }

  onConfirm() {
    this.dialogRef.close(this.themeTitle);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteChapterComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm delete',
        message: `Theme: "${this.themeTitle}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  canDelete() {
    return this.operType === OperType.EDIT;
  }
}
