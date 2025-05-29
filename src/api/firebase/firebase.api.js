import firebaseConfig from "./config/config.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const loadUser = (database, collection, field) => {
  const userRef = doc(database, collection, field);
  const querySnapshot = getDoc(userRef);
  return querySnapshot;
};
export const loadAllUsers = () => {
  const usersRef = query(collection(db, "users"));
  const querySnapshot = getDocs(usersRef);
  return querySnapshot;
};
