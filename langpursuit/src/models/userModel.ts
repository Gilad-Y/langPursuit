export class UserModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  private userPass: string;
  public type: boolean;
  public lang: [];

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    userPass: string,
    type: boolean,
    lang: []
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.userPass = userPass;
    this.type = type;
    this.lang = lang;
  }

  // Getter for userPassword
  public set _userPass(pass: string) {
    this.userPass = pass;
  }

  public get _userPass(): string {
    return this.userPass;
  }
}
