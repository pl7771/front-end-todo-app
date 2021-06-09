import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Chapter} from 'src/app/models/Chapter';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {EditChapterComponent} from '../../dialog/edit-chapter/edit-chapter.component';
import {MatDialog} from '@angular/material/dialog';
import {Theme} from '../../models/Theme';
import {OperType} from '../../dialog/OperType';


@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChapterComponent implements OnInit {


  displayedColumns: string[] = ['color', 'chapterId', 'chapterName', 'subjectName', 'priorityName', 'date'];
  dataSource: MatTableDataSource<Chapter>; //source for table


  @ViewChild(MatPaginator, {static:false})
  private paginator: MatPaginator;

  @ViewChild(MatSort, {static:false})
  private sort: MatSort;



  chapters: Chapter[];


  @Input('chapters')
  private set setChapters(chapters: Chapter[]){
    this.chapters = chapters;
    this.fillTable();
  }

  @Output()
  updateChapter = new EventEmitter<Chapter>();

  @Output()
  deleteChapter = new EventEmitter<Chapter>();

  @Output()
  selectTheme = new EventEmitter<Theme>();

  @Output()
  addChapter = new EventEmitter<Chapter>();

  @Input()
  selectedTheme: Theme;

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.fillTable();
  }

  toggleChapterCompleted(chapter: Chapter) {
    chapter._isFinished = !chapter.isFinished;
  }

  private getPriorityColor(chapter: Chapter) : string{

    if(chapter.isFinished){
      return '#F8F8FA';
    }

    if (chapter.priority && chapter.priority.color) {
      return chapter.priority.color;
    }
    return '#ffffff';
  }


  // toont chapters met bijhorende opties
  private fillTable() {
    if(!this.dataSource){return;}

    this.dataSource.data = this.chapters;
    this.addTableObjects();

    this.dataSource.sortingDataAccessor = (chapter, colName) => {
      switch (colName) {
        case 'priorityName': {return chapter.priority ? chapter.priority.id : null}
        case 'subjectName': {return chapter.theme ? chapter.theme.id : null}
        case 'chapterName': {return chapter.title}
      }
    }
  }

  private addTableObjects(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  openEditChapterDialog(chapter: Chapter): void {
    const dialogRef = this.dialog.open(EditChapterComponent, {data: [chapter, 'Edit chapter', OperType.EDIT], autoFocus: false});
    dialogRef.afterClosed().subscribe(result => {

      if(result === 'complete'){
        chapter._isFinished = true;
        this.updateChapter.emit(chapter);
      }

      if(result === 'activate'){
        chapter._isFinished = false;
        this.updateChapter.emit(chapter);
        return;
      }

      if(result === 'delete'){
        this.deleteChapter.emit(chapter);
        return;
      }

      if(result as Chapter){
        this.updateChapter.emit(chapter);
        return;
      }

    });
  }

  onSelectTheme(theme: Theme) {
    this.selectTheme.emit(theme);

  }

  openAddChapterDialog() {
    const chapter = new Chapter(null, '', false, null, null);
    console.log(chapter);
    console.log("in open add chapter dialog");
    const dialogRef = this.dialog.open(EditChapterComponent, {data: [chapter, 'Hoofdstuk toevoegen', OperType.ADD]});

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addChapter.emit(chapter);
      }
    });
  }
}
