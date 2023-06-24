export class Item {
  private _uid: string;
  private _name: string;
  private _amount: number;
  private _value: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    uid: string,
    name: string,
    amount: number,
    value: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._uid = uid;
    this._name = name;
    this._amount = amount;
    this._value = value;

    if (createdAt) this._createdAt = createdAt;
    else this._createdAt = new Date();

    if (updatedAt) this._updatedAt = updatedAt;
    else this._updatedAt = new Date();
  }

  public get uid() {
    return this._uid;
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

  /**
   * 
   * @note Aggiorna il campo **updatedAt**
   * 
   * @param name Il nuovo nome dell'oggetto
   * @param amount La nuova quantità dell'oggetto
   * @param value Il nuovo valore per unità dell'oggetto
   * @returns L'oggetto aggiornato
   */
  public edit(name: string, amount: number, value: number) {
    this._name = name;
    this._amount = amount;
    this._value = value;
    this._updatedAt = new Date();

    return this;
  }
}
