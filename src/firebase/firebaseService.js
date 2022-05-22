import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

var database;

export function initFirebase(config) {
  const app = initializeApp(config);  
  database = getFirestore(app);
}

const getCollectionReferenceOf = (collection_name) =>
  collection(database, collection_name);

// Read Array document
export const getDocumentsOf = (collection_name) => {
  const colRef = getCollectionReferenceOf(collection_name);
  return getDocs(colRef).then((snapshot) => {
    return snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  }).catch(err => console.log(err.message));
};

// Add document to the database
export const addDocument = (collection_name, data) => {
  const colRef = getCollectionReferenceOf(collection_name);
  return addDoc(colRef, data);
}

// Delete a document
export const deleteDocument = (collection_name, document_id) => {
  const docRef = doc(database, collection_name, document_id);
  return deleteDoc(docRef);
}