
export interface ThemeJSON{
  id: number;
  title: string;
}


export class Theme{

  constructor(public _id: number, public _title: string) {}

  static fromJSON(json: ThemeJSON): Theme{
    const theme = new Theme(
      json.id,
      json.title
    );
    return theme;
  }

  toJSON(): ThemeJSON {
    return <ThemeJSON>{
      id: this.id,
      title: this.title
    };
  }

  get id():number{
    return this._id;
  }

  get title():string{
    return this._title;
  }

}

