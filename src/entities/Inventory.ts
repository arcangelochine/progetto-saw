import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

class Item {
  private name: string;
  private amount: number;
  private value: number;

  constructor(name: string, amount: number, value: number) {
    this.name = name;
    this.amount = amount;
    this.value = value;
  }

  getName = () => this.name;

  getAmount = () => this.amount;

  getValue = () => this.value;
}

export class Inventory {
  private name: string;
  private owner: string;
  private items: Item[];
  private capacity: number;
  private value: number;

  constructor(name: string, owner: string, items: Item[], capacity: number) {
    this.name = name;
    this.owner = owner;
    this.items = items;
    this.capacity = capacity;
    this.value = this.computeValue();
  }

  getName = () => this.name;

  getOwner = () => this.owner;

  getItems = () => this.items;

  getCapacity = () => this.capacity;

  computeValue = () =>
    this.items
      .map((item) => item.getValue())
      .reduce((sum, item) => sum + item, 0);

  getValue = () => this.value;
}

export const inventoryConverter = {
  toFirestore: (inventory: Inventory) => {
    return {
      name: inventory.getName(),
      owner: inventory.getOwner(),
      items: inventory.getItems(),
      capacity: inventory.getCapacity(),
      value: inventory.getValue(),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Inventory(data.name, data.owner, data.items, data.capacity);
  },
};
