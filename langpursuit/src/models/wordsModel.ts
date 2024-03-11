export class wordsModel {
  public id: number;
  public userId: number;
  public word: string;
  public definition: string;
  public lang: string;

  constructor(
    id: number,
    userId: number,
    word: string,
    definition: string,
    lang: string
  ) {
    this.id = id;
    this.userId = userId;
    this.word = word;
    this.definition = definition;
    this.lang = lang;
  }
}
