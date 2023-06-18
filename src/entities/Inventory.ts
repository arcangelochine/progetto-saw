import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

class Item {
  private _name: string;
  private _amount: number;
  private _value: number;

  constructor(name: string, amount: number, value: number) {
    this._name = name;
    this._amount = amount;
    this._value = value;
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
}

export class Inventory {
  private _uid: string;
  private _name: string;
  private _owner: string;
  private _items: Array<Item>;
  private _capacity: number;
  private _value: number;

  constructor(
    uid: string,
    name: string,
    owner: string,
    items: Array<Item>,
    capacity: number
  ) {
    this._uid = uid;
    this._name = name;
    this._owner = owner;
    this._items = items;
    this._capacity = capacity;
    this._value = this.computeValue();
  }

  public get uid() {
    return this._uid;
  }

  public get name() {
    return this._name;
  }

  public get owner() {
    return this._owner;
  }

  public get items() {
    return this._items;
  }

  public get capacity() {
    return this._capacity;
  }

  computeValue() {
    return this.items
      .map((item) => item.value * item.amount)
      .reduce((sum, item) => sum + item, 0);
  }

  public get value() {
    return this._value;
  }
}

export const inventoryConverter = {
  toFirestore: (inventory: Inventory) => {
    return {
      name: inventory.name,
      owner: inventory.owner,
      items: inventory.items,
      capacity: inventory.capacity,
      value: inventory.value,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    
    return new Inventory(
      snapshot.id,
      data.name,
      data.owner,
      data.items.map((item: Item) => new Item(item.name, item.amount, item.value)),
      data.capacity
    );
  },
};
