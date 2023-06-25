import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Item } from "./Item";

export const toRecordFormat = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
};

export class Record {
  private _date: string;
  private _value: number;
  private _mean: number;
  private _deviation: number;

  constructor(
    date?: string,
    value?: number,
    mean?: number,
    deviation?: number
  ) {
    this._date = date || toRecordFormat(new Date());

    this._value = value || 0;
    this._mean = mean || 0;
    this._deviation = deviation || 0;
  }

  public get date() {
    return this._date;
  }

  public get value() {
    return this._value;
  }

  public get mean() {
    return this._mean;
  }

  public get deviation() {
    return this._deviation;
  }

  public set(items: Item[]) {
    this._date = toRecordFormat(new Date());

    // Calcolo il valore totale
    this._value = items
      .map((item) => item.value * item.amount)
      .reduce((sum, item) => sum + item, 0);

    // Calcolo la media
    this._mean =
      this._value /
      items.map((item) => item.amount).reduce((sum, item) => sum + item, 0);
    this._mean = parseFloat(this.mean.toFixed(2));

    // Calcolo la deviazione standard
    this._deviation = items
      .map((item) => (item.value - this.mean) ** 2)
      .reduce((sum, item) => sum + item, 0);
    this._deviation = Math.sqrt(
      this._deviation /
        items.map((item) => item.amount).reduce((sum, item) => sum + item, 0)
    );
    this._deviation = parseFloat(this.deviation.toFixed(2));

    return this;
  }

  public empty() {
    return this.set([]);
  }
}

export const recordConverter = {
  toFirestore: (record: Record) => {
    return {
      date: record.date,
      value: record.value,
      mean: record.mean,
      deviation: record.deviation,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);

    return new Record(data.date, data.value, data.mean, data.record);
  },
};
