import {
  Timestamp,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export class User {
  private username: string; // always lower case
  private displayName: string; // case sensitive
  private email: string;
  private premium: boolean;
  private registeredAt: Date;

  constructor(
    username: string,
    displayName: string,
    email: string,
    premium: boolean,
    registeredAt: Date
  ) {
    this.username = username;
    this.displayName = displayName;
    this.email = email;
    this.premium = premium;
    this.registeredAt = registeredAt;
  }

  getUsername = () => this.username;

  getDisplayName = () => this.displayName;

  getEmail = () => this.email;

  getRegisterDate = () => this.registeredAt;

  isPremium = () => this.premium;
}

export const userConverter = {
  toFirestore: (user: User) => {
    return {
      username: user.getUsername(),
      display_name: user.getDisplayName(),
      email: user.getEmail(),
      premium: user.isPremium(),
      registered_at: Timestamp.fromDate(user.getRegisterDate()),
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
