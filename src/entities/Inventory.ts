import {
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from "firebase/firestore";
import { Item, itemConverter } from "./Item";
import { Record, recordConverter, toRecordFormat } from "./Record";

const UID = (length: number): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let uniqueID = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueID += characters.charAt(randomIndex);
  }

  return uniqueID;
};

export class Inventory {
  // Lo uid è null in fase di creazione dell'inventario
  private _uid: string | null;
  private _name: string;
  private _owner: string;
  private _items: Array<Item>;
  private _capacity: number;
  private _value: number;
  private _history: Array<Record>;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    uid: string | null,
    name: string,
    owner: string,
    items: Array<Item>,
    capacity: number,
    value?: number,
    history?: Array<Record>,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._uid = uid;
    this._name = name;
    this._owner = owner;
    this._items = items;
    this._capacity = capacity;
    this._value = value || this.computeValue();
    this._history = history || new Array<Record>();
    this._createdAt = createdAt || new Date();
    this._updatedAt = updatedAt || this._createdAt;
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

  public get value() {
    return this._value;
  }

  public get history() {
    return this._history;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  /**
   *
   * @note Utility per calcolare il valore dell'inventario in base alla lista di oggetti
   *
   * @returns Valore dell'inventario
   */
  private computeValue() {
    return this.items
      .map((item) => item.value * item.amount)
      .reduce((sum, item) => sum + item, 0);
  }

  /**
   *
   * @note Utility per aggiornare lo storico dell'inventario
   * @note Lo storico contiene i **Record** dei 7 giorni più recenti in cui è avvenuta una modifca dell'inventario
   */
  private updateHistory() {
    const today = toRecordFormat(new Date());

    if (this._history.length === 7) {
      // History piena
      if (this._history.filter((record) => record.date === today).length) {
        // Oggi è già avvenuta una modifica
        this._history = this._history.filter((record) => {
          if (record.date === today) return record.set(this._items);

          return record;
        });
      } else {
        // Oggi non è avvenuta alcuna modifica
        this._history = this._history.sort(
          (a, b) => Date.parse(b.date) - Date.parse(a.date)
        );

        this._history.pop();
        this._history.unshift(new Record(today).set(this._items));
      }

      return;
    }

    // History non piena
    if (this._history.filter((record) => record.date === today).length) {
      // Oggi è già avvenuta una modifica
      this._history = this._history.map((record) => {
        if (record.date === today) return record.set(this._items);

        return record;
      });
    } else {
      // Oggi non è avvenuta alcuna modifica
      const record = new Record(today).set(this._items);

      this._history = [...this._history, record];
    }
  }

  /**
   *
   * @note Aggiorna il campo **updatedAt**
   *
   * @param name Il nuovo nome dell'inventario
   * @returns L'inventario con il nuovo nome
   */
  public editName(name: string) {
    this._name = name;
    this._updatedAt = new Date();

    return this;
  }

  /**
   *
   * @param uid L'identificatore dell'oggetto
   * @returns La lista di oggetti filtrata secondo l'identificatore
   */
  public filterItemsByUID(uid: string) {
    return this.items.filter((item) => item.uid === uid);
  }

  /**
   *
   * @param query Il nome (o parte di esso) dell'oggetto
   * @returns La lista di oggetti filtrata secondo il nome (o parte di esso)
   */
  public filterItemsByName(query: string) {
    return this.items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  /**
   *
   * @note Aggiorna il campo **updatedAt**
   * @note Aggiorna il campo **history**
   *
   * @param name Il nome del nuovo oggetto
   * @param amount La quantità del nuovo oggetto
   * @param value Il valore per unità del nuovo oggetto
   *
   * @returns L'inventario con la lista di oggetti aggiornata
   */
  public addItem(name: string, amount: number, value: number) {
    let uid = UID(5);

    while (this.filterItemsByUID(uid).length) uid = UID(5);

    const item = new Item(uid, name, amount, value);

    this._items = [...this._items, item];
    this._value = this.computeValue();
    this.updateHistory();
    this._updatedAt = new Date();

    return this;
  }

  /**
   *
   * @note Aggiorna il campo **updatedAt**
   * @note Aggiorna il campo **updatedAt** dell'oggetto
   * @note Aggiorna il campo **history**
   *
   * @param uid L'identificatore dell'oggetto da modificare
   * @param name Il nuovo nome dell'oggetto
   * @param amount La nuova quantità dell'oggetto
   * @param value Il nuovo valore per unità dell'oggetto
   * @returns L'inventario con la lista di oggetti aggiornata
   */
  public editItem(uid: string, name: string, amount: number, value: number) {
    this._items = this.items.map((item) => {
      if (item.uid === uid) {
        return item.edit(name, amount, value);
      }
      return item;
    });
    this._value = this.computeValue();
    this.updateHistory();
    this._updatedAt = new Date();

    return this;
  }

  /**
   *
   * @note Aggiorna il campo **updatedAt**
   * @note Aggiorna il campo **history**
   *
   * @param uid L'identificatore dell'oggetto da eliminare
   * @returns L'inventario con la lista di oggetti aggiornata
   */
  public deleteItem(uid: string) {
    this._items = this.items.filter((item) => item.uid !== uid);
    this._value = this.computeValue();
    this.updateHistory();
    this._updatedAt = new Date();

    return this;
  }
}

export const inventoryConverter = {
  toFirestore: (inventory: Inventory) => {
    return {
      name: inventory.name,
      owner: inventory.owner,
      items: inventory.items.map((item) => itemConverter.toFirestore(item)),
      capacity: inventory.capacity,
      value: inventory.value,
      history: inventory.history.map((record) =>
        recordConverter.toFirestore(record)
      ),
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
      data.items.map((item: Item) => {
        return new Item(item.uid, item.name, item.amount, item.value);
      }),
      data.capacity,
      data.value,
      data.history.map(
        (record: Record) =>
          new Record(record.date, record.value, record.mean, record.deviation)
      ),
      new Date(data.createdAt.toDate()),
      new Date(data.updatedAt.toDate())
    );
  },
};
