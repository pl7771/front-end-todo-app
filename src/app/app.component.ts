import {Component, OnInit} from '@angular/core';
import {Theme} from './models/Theme';
import {DataHandlerService} from './service/data-handler.service';
import {Chapter} from './models/Chapter';
import {Observable, zip} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'projectWA4';
  themes: Theme[];
  chapters: Chapter[];
  selectedTheme: Theme = null;

  totalChapters: number
  totalCompletedChapters: number
  totalUncompletedChapters: number

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.updateTasksAndStats();
    this.dataHandlerService.getAllThemes$().subscribe(themes => this.themes = themes);
    this.onSelectTheme(null);

  }

  onSelectTheme(theme: Theme) {
    if (theme == null) {
      this.updateTasksAndStats();
    } else {
      this.selectedTheme = theme;
      this.dataHandlerService.getChaptersByTheme$(theme.id).subscribe(chapters => this.chapters = chapters);
    }
  }

  onUpdateChapter(chapter: Chapter) {
    this.dataHandlerService.updateChapter$(chapter).subscribe(() => {
      this.updateTasksAndStats();
    });
  }

  onDeleteChapter(chapter: Chapter) {
    this.dataHandlerService.deleteChapter$(chapter).subscribe(() => {
      this.dataHandlerService.getChaptersByPriorityOrTheme$().subscribe(chapters => this.chapters = chapters);
    });
  }

  onDeleteTheme(theme: Theme) {
    this.dataHandlerService.deleteTheme$(theme.id).subscribe(e => {
      this.dataHandlerService.getAllThemes$().subscribe( themes => this.themes = themes);
    });
  }

  onUpdateTheme(theme: Theme) {
    this.dataHandlerService.updateTheme$(theme).subscribe(() => {
      this.dataHandlerService.getAllThemes$().subscribe( themes => this.themes = themes);
    });
  }

  onAddChapter(chapter: Chapter) {
    this.dataHandlerService.addChapter$(chapter).subscribe(result => {
      this.updateTasksAndStats();
    });
  }

  onAddTheme(titel: string) {
    this.dataHandlerService.addTheme$(new Theme(null, titel)).subscribe( result => {
      this.dataHandlerService.getAllThemes$().subscribe( themes => this.themes = themes);
    });
  }

  updateTasksAndStats(){
      zip(
        this.dataHandlerService.getChaptersByPriorityOrTheme$()
      ).subscribe(array => {
        this.totalChapters = array[0].length;
        this.totalCompletedChapters = array[0].filter(e => e._isFinished).length;
        this.totalUncompletedChapters = array[0].filter(e => !e._isFinished).length;
      });
    this.dataHandlerService.getChaptersByPriorityOrTheme$().subscribe(chapters => this.chapters = chapters);
  }


}
