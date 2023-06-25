import { db } from "./firebase";
import {
  Inventory,
  Item,
  inventoryConverter,
  userConverter,
} from "../entities";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { User } from "firebase/auth";

const DEFAULT_INVENTORY_NAME = "Nuovo inventario";
const DEFAULT_INVENTORY_AMOUNT = 5;
const DEFAULT_INVENTORY_CAPACITY = 1000;
const PREMIUM_INVENTORY_AMOUNT = 10;
const PREMIUM_INVENTORY_CAPACITY = 5000;

export class DocumentNotFoundError extends Error {}

const inventories = collection(db, "inventories").withConverter(
  inventoryConverter
);

const users = collection(db, "users").withConverter(userConverter);

export const isPremium = async (user: User) => {
  const queryDoc = query(users, where("email", "==", user.email));

  return getDocs(queryDoc).then((snap) => {
    if (snap.empty) return false;

    return snap.docs[0].data().premium;
  });
};

export const getInventoriesOfUser = async (user: User) => {
  const queryDoc = query(inventories, where("owner", "==", user.email));

  return getDocs(queryDoc).then((snap) => {
    return snap.docs.map((doc) => doc.data());
  });
};

export const getInventoryOfUser = async (user: User, docId: string) => {
  if (docId.length === 0) throw new DocumentNotFoundError();

  const queryDoc = query(inventories, where("owner", "==", user.email));

  return getDocs(queryDoc).then((snap) => {
    if (snap.empty) throw new DocumentNotFoundError();

    return snap.docs.filter((doc) => doc.id === docId);
  });
};

export const createInventory = async (user: User) => {
  const premium = await isPremium(user);
  const maxAmount = premium
    ? PREMIUM_INVENTORY_AMOUNT
    : DEFAULT_INVENTORY_AMOUNT;
  const capacity = premium
    ? PREMIUM_INVENTORY_CAPACITY
    : DEFAULT_INVENTORY_CAPACITY;

  const amount = (await getInventoriesOfUser(user)).length;

  if (amount === maxAmount) return;

  return addDoc(
    inventories,
    new Inventory(
      null,
      DEFAULT_INVENTORY_NAME,
      user.email!,
      new Array<Item>(),
      capacity
    )
  );
};

export const deleteInventory = async (user: User, docId: string) => {
  return getInventoryOfUser(user, docId).then((snap) => {
    if (snap[0]) return deleteDoc(doc(db, "inventories", snap[0].id));
  });
};

export const updateInventory = async (
  user: User,
  docId: string,
  inventory: Inventory
) => {
  return getInventoryOfUser(user, docId).then((snap) => {
    if (snap[0])
      return setDoc(
        doc(db, "inventories", snap[0].id).withConverter(inventoryConverter),
        inventory
      );
  });
};
