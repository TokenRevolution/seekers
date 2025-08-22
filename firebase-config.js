// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgePXYUhyK2LJEc7_hgRDH-1ZLY0I_R-8",
  authDomain: "seekers-34b3a.firebaseapp.com",
  projectId: "seekers-34b3a",
  storageBucket: "seekers-34b3a.firebasestorage.app",
  messagingSenderId: "986703483665",
  appId: "1:986703483665:web:4be6555389a22831ec32b0",
  measurementId: "G-TVZKNCBYNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to save form data to Firestore
export async function saveFormData(formData) {
  try {
    const docRef = await addDoc(collection(db, "registrations"), {
      // Partecipante 1
      participant1: {
        name: formData.name1,
        surname: formData.surname1,
        email: formData.email1,
        phone: formData.phone1,
        age: parseInt(formData.age1)
      },
      // Partecipante 2
      participant2: {
        name: formData.name2,
        surname: formData.surname2,
        email: formData.email2,
        phone: formData.phone2,
        age: parseInt(formData.age2)
      },
      // Informazioni aggiuntive
      teamName: formData.teamName || null,
      experience: formData.experience || 'novice',
      motivation: formData.motivation || null,
      newsletter: formData.newsletter || false,
      // Metadata
      timestamp: serverTimestamp(),
      status: 'pending'
    });
    
    console.log("Document written with ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error: error.message };
  }
}

export { db, analytics }; 