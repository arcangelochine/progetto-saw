import {
  Timestamp,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export class User {
  private username: string; // lower case (case-insensitive)
  private displayName: string; // case sensitive
  private email: string;
  private permission: number;
  private registeredAt: Date;

  constructor(
    username: string,
    displayName: string,
    email: string,
    permission: number,
    registeredAt: Date
  ) {
    this.username = username;
    this.displayName = displayName;
    this.email = email;
    this.permission = permission;
    this.registeredAt = registeredAt;
  }

  getUsername() {
    return this.username;
  }

  getDisplayName() {
    return this.displayName;
  }

  getEmail() {
    return this.email;
  }

  getPerm() {
    return this.permission;
  }

  getRegisterDate() {
    return this.registeredAt;
  }

  isAdmin() {
    return this.permission === 100;
  }
}

export const userConverter = {
  toFirestore: (user: User) => {
    return {
      username: user.getUsername(),
      display_name: user.getDisplayName(),
      email: user.getEmail(),
      permission: user.getPerm(),
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
      data.permission,
      new Date(data.registered_at)
    );
  },
};
