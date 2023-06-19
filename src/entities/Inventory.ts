import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";
import { Item } from "./Item";

export class Inventory {
  // Lo uid è null in fase di creazione dell'inventario
  private _uid: string | null;
  private _name: string;
  private _owner: string;
  private _items: Array<Item>;
  private _capacity: number;
  private _value: number;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    uid: string | null,
    name: string,
    owner: string,
    items: Array<Item>,
    capacity: number,
    value?: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._uid = uid;
    this._name = name;
    this._owner = owner;
    this._items = items;
    this._capacity = capacity;

    if (value) this._value = value;
    else this._value = this.computeValue();

    if (createdAt) this._createdAt = createdAt;
    else this._createdAt = new Date();

    if (updatedAt) this._updatedAt = updatedAt;
    else this._updatedAt = this._createdAt;
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

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set items(value: Array<Item>) {
    this._items = value;
  }

  public set updatedAt(value: Date) {
    this._updatedAt = value;
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
      createdAt: Timestamp.fromDate(inventory.createdAt),
      updatedAt: Timestamp.fromDate(inventory.updatedAt),
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
      data.items.map(
        (item: Item) => new Item(item.name, item.amount, item.value)
      ),
      data.capacity,
      data.value,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  },
};
