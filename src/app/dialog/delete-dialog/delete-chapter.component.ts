import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Chapter} from '../../models/Chapter';
import {DataHandlerService} from '../../service/data-handler.service';

@Component({
  selector: 'app-delete-chapter',
  templateUrl: './delete-chapter.component.html',
  styleUrls: ['./delete-chapter.component.css']
})
export class DeleteChapterComponent implements OnInit {

   dialogTitle: string;
   message: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteChapterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {dialogTitle: string, message: string},
  ) {
    this.dialogTitle = data.dialogTitle;
    this.message = data.message
  }

  ngOnInit(): void {
  }

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
