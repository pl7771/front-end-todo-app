import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';
import {Chapter} from '../../models/Chapter';
import {Theme} from '../../models/Theme';
import {Priority} from '../../models/Priority';
import {DeleteChapterComponent} from '../delete-dialog/delete-chapter.component';
import {OperType} from '../OperType';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.css']
})
export class EditChapterComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<EditChapterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Chapter, string, OperType],
    private dataHandler :DataHandlerService,
    private dialog: MatDialog
  ) { }

  operType: OperType;
  dialogTitle: string;
  chapter: Chapter;
  themes: Theme[];
  priorities: Priority[];
  tmpTitle: string;
  tmpTheme: Theme;
  tmpPriority: Priority;
  tmpDate: Date;

  ngOnInit(): void {


    this.chapter = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType = this.data[2];


    this.tmpTitle = this.chapter._title;

    this.tmpPriority = this.chapter._priority;
    this.tmpDate = this.chapter._date;

    this.dataHandler.getAllThemes$().subscribe(themes => this.themes = themes);
    this.dataHandler.getAllPriorities$().subscribe(prios => this.priorities = prios);

    this.tmpTheme = this.chapter._theme;
  }

  onConfirm() {
    this.chapter._title = this.tmpTitle;
    this.chapter._theme = this.tmpTheme;
    this.chapter._priority = this.tmpPriority;
    this.chapter._date = this.tmpDate;
    this.dialogRef.close(this.chapter);
    console.log(this.chapter);
    console.log("in edit chapter comp constructor")
    console.log(this.chapter);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  delete() {
    const dialogRef = this.dialog.open(DeleteChapterComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Confirm delete',
        message: `Chapter: "${this.chapter.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  complete() {
    this.dialogRef.close('complete')
  }

  activate() {
    this.dialogRef.close('activate')
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

  canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT;
  }
}
