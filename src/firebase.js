import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAKrQc7eKNnT0dXbtrUwee74GGaA1JqHhU",
  authDomain: "d-model-app-56b9d.firebaseapp.com",
  projectId: "d-model-app-56b9d",
  storageBucket: "d-model-app-56b9d.firebasestorage.app",
  messagingSenderId: "489406435954",
  appId: "1:489406435954:web:a8031628f96c94beda28eb",
  measurementId: "G-NPNTBTQG3K",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
