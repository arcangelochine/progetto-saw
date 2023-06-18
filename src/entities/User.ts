import {
  Timestamp,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export class User {
  private _username: string; // always lower case
  private _displayName: string; // case sensitive
  private _email: string;
  private _premium: boolean;
  private _registeredAt: Date;

  constructor(
    username: string,
    displayName: string,
    email: string,
    premium: boolean,
    registeredAt: Date
  ) {
    this._username = username;
    this._displayName = displayName;
    this._email = email;
    this._premium = premium;
    this._registeredAt = registeredAt;
  }

  public get username() {
    return this._username;
  }

  public get displayName() {
    return this._displayName;
  }

  public get email() {
    return this._email;
  }

  public get premium() {
    return this._premium;
  }

  public get registeredAt() {
    return this._registeredAt;
  }
}

export const userConverter = {
  toFirestore: (user: User) => {
    return {
      username: user.username,
      display_name: user.displayName,
      email: user.email,
      premium: user.premium,
      registered_at: Timestamp.fromDate(user.registeredAt),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new User(
      data.username,
      data.display_name,
      data.email,
      data.premium,
      new Date(data.registered_at)
    );
  },
};
