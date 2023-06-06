import {
  Timestamp,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export class User {
  private username: string;
  private email: string;
  private permission: number;
  private registeredAt: Date;

  constructor(
    username: string,
    email: string,
    permission: number,
    registeredAt: Date
  ) {
    this.username = username;
    this.email = email;
    this.permission = permission;
    this.registeredAt = registeredAt;
  }

  getUsername() {
    return this.username;
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
      email: user.getEmail(),
      permission: user.getPerm(),
      registeredAt: Timestamp.fromDate(user.getRegisterDate()),
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new User(
      data.username,
      data.email,
      data.permission,
      new Date(data.registeredAt)
    );
  },
};
