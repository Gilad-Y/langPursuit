export class wordsModel {
  public id: number;
  public userId: number;
  public category: string;
  public word: string;
  public definition: string;
  public lang: string;

  constructor(
    id: number,
    userId: number,
    category: string,
    word: string,
    definition: string,
    lang: string
  ) {
    this.id = id;
    this.userId = userId;
    this.category = category;
    this.word = word;
    this.definition = definition;
    this.lang = lang;
  }
}
