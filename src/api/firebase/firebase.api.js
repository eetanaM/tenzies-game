import firebaseConfig from "./config/config.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
