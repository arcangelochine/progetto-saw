import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class Item {
  private _uid: string;
  private _name: string;
  private _amount: number;
  private _value: number;

  constructor(uid: string, name: string, amount: number, value: number) {
    this._uid = uid;
    this._name = name;
    this._amount = amount;
    this._value = value;
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

  /**
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

    return this;
  }
}

export const itemConverter = {
  toFirestore: (item: Item) => {
    return {
      uid: item.uid,
      name: item.name,
      amount: item.amount,
      value: item.value,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);

    return new Item(data.uid, data.name, data.amount, data.value);
  },
};
