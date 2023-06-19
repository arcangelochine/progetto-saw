export class Item {
  private _name: string;
  private _amount: number;
  private _value: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    name: string,
    amount: number,
    value: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._name = name;
    this._amount = amount;
    this._value = value;

    if (createdAt) this._createdAt = createdAt;
    else this._createdAt = new Date();

    if (updatedAt) this._updatedAt = updatedAt;
    else this._updatedAt = new Date();
  }

  public get name() {
    return this._name;
  }

  public get amount() {
    return this._amount;
  }

  public get value() {
    return this._value;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set amount(value: number) {
    this._amount = value;
  }

  public set value(value: number) {
    this._value = value;
  }

  public set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
