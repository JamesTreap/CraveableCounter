import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
  increment,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDkP97xtXT7CXfbly_HUBSSpMLPPDq34mc",
  authDomain: "craveable-counter.firebaseapp.com",
  projectId: "craveable-counter",
  storageBucket: "craveable-counter.firebasestorage.app",
  messagingSenderId: "728446380084",
  appId: "1:728446380084:web:782a9fe0f8fd71c9d20261",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export const auth = getAuth();

export async function fetchDataFromCollection(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const dataList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return dataList;
}

export async function updateDataByTitle(title: string, incrementBy: number = 1): Promise<void> {
  if (auth.currentUser) {
    console.log("Current user's UID:", auth.currentUser.uid);
  } else {
    toast.error("Please log in to update data.");
    throw new Error("User must be logged in first.");
  }

  const dataRef = collection(db, "data");
  const q = query(dataRef, where("title", "==", title));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No document found with title: "${title}". Cannot update.`);
      return;
    }

    const docToUpdate = querySnapshot.docs[0];
    const docRef = doc(db, "data", docToUpdate.id);

    await updateDoc(docRef, {
      count: increment(incrementBy), // Atomically increments the count
      lastTimestamp: Timestamp.now(), // Sets the timestamp to the current server time
    });

    console.log(`Document with title "${title}" updated successfully.`);
  } catch (error) {
    console.error(`Error updating document with title "${title}":`, error);
    toast.error("Failed to update data. Please try again later.");
    throw error;
  }
}
