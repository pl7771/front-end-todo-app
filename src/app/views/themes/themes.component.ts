import {Component, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Theme} from '../../models/Theme';
import {EventEmitter} from '@angular/core';
import {EditThemeDialogComponent} from '../../dialog/edit-theme-dialog/edit-theme-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {OperType} from '../../dialog/OperType';

@Component({
  selector: 'app-subjects',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemeComponent implements OnInit {

  @Input()
  themes: Theme[];

  @Output()
  selectTheme = new EventEmitter<Theme>();

  @Input()
  selectedTheme: Theme;

  @Output()
  deleteTheme = new EventEmitter<Theme>();

  @Output()
  updateTheme = new EventEmitter<Theme>();

  @Output()
  addTheme = new EventEmitter<string>();

  private indexMouseMove: number;



  constructor(private dialog: MatDialog, private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {

  }

  getChaptersByTheme(theme: Theme): void {
    if(this.selectedTheme === theme){
      return;
    }
    this.selectedTheme = theme;

    this.selectTheme.emit(this.selectedTheme);
  }

  showEditIcon(index: number) {
    this.indexMouseMove = index;
    console.log(index);
  }

  private openEditDialog(theme: Theme){
    const dialogRef = this.dialog.open(EditThemeDialogComponent, {data: [theme.title, "Edit vak", OperType.EDIT], width: '400px'});

    dialogRef.afterClosed().subscribe( result => {
        if(result === 'delete'){
          this.deleteTheme.emit(theme);
          return;
        }

        if(result as string){
          theme._title = result as string;
          this.updateTheme.emit(theme);
          return;
        }
    });
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(EditThemeDialogComponent, {data: ['', 'Vak toevoegen'], width: '400px'});

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addTheme.emit(result as string);
      }
    })
  }
}
