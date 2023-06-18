import { db } from "./firebase";
import { inventoryConverter } from "../entities";
import { collection, getDocs, query, where } from "firebase/firestore";
import { User } from "firebase/auth";

const inventories = collection(db, "inventories").withConverter(
  inventoryConverter
);

export const getInventoriesOfUser = async (user: User) => {
  const queryDoc = query(inventories, where("owner", "==", user.email));

  return getDocs(queryDoc).then((snap) => {
    return snap.docs.map((doc) => doc.data());
  });
};
