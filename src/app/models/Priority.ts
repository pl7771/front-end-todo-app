export interface PriorityJSON{
  id: number;
  title: string;
  color: string;
}

export class Priority {
  private static id: number;
  private static title: string;
  private static color: string;

  constructor(private _id: number, private _title: string, private  _color: string) {}

  static fromJSON(json: PriorityJSON): Priority{
    const theme = new Priority(
      json.id,
      json.title,
      json.color
    );
    return theme;
  }


  toJSON(): PriorityJSON {
    return <PriorityJSON>{
      id: this.id,
      title: this.title,
      color: this.color
    };
  }

  get id():number{
    return this._id;
  }

  get title():string{
    return this._title;
  }

  get color():string{
    return this._color;
  }
}
