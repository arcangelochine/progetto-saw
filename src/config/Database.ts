import { db } from "./firebase";
import { inventoryConverter, userConverter } from "../entities";
import { collection, getDocs, query, where } from "firebase/firestore";
import { User } from "firebase/auth";

const inventories = collection(db, "inventories").withConverter(
  inventoryConverter
);

const users = collection(db, "users").withConverter(userConverter);

export const getInventoriesOfUser = async (user: User) => {
  const queryDoc = query(inventories, where("owner", "==", user.email));

  return getDocs(queryDoc).then((snap) => {
    return snap.docs.map((doc) => doc.data());
  });
};

export const isPremium = async (user: User) => {
  const queryDoc = query(users, where("email", "==", user.email));

  return getDocs(queryDoc).then((snap) => {
    if (snap.empty) return false;

    return snap.docs[0].data().premium;
  });
};
