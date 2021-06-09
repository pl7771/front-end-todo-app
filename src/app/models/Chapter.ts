import {Priority, PriorityJSON} from './Priority';
import {Theme, ThemeJSON} from './Theme';

interface ChapterJSON {
  id: number;
  title: string;
  isFinished: boolean;
  priority?: PriorityJSON;
  theme?: ThemeJSON;
  date?: string;
}

export class Chapter {

  constructor(private _id: number,
              public _title: string,
              public _isFinished: boolean,
              public _priority?: Priority,
              public _theme?: Theme,
              public _date?: Date) {

  }

  static fromJSON(json: ChapterJSON): Chapter {
    const chapter = new Chapter(
      json.id,
      json.title,
      json.isFinished,
      json.priority === null ? null : Priority.fromJSON(json.priority),
      json.theme === null ? null  : Theme.fromJSON(json.theme),
      json.date == null? null : new Date(json.date));

    return chapter;
  }

  toJSON(): ChapterJSON {
    return <ChapterJSON>{
      id: this.id,
      title: this.title,
      isFinished: this.isFinished,
      priority: this.priority?.toJSON(),
      theme: this.theme?.toJSON(),
      date: this.date?.toISOString()
    };
  }


  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get isFinished(): boolean{
    return  this._isFinished;
  }

  get priority(): Priority{
    return  this._priority;
  }

  get theme(): Theme{
    return this._theme;
  }

  get date(): Date{
    return this._date;

  }
}
