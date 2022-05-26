import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, orderBy, FieldValue, updateDoc } from "firebase/firestore";

var database;

export function initFirebase(config) {
  const app = initializeApp(config);  
  database = getFirestore(app);
}

const getCollectionReferenceOf = (collection_name) =>
  collection(database, collection_name);

const documentsInDatabase = (colRef) => {
    return getDocs(colRef)
      .then((snapshot) => {
        return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      })
      .catch((err) => console.log(err.message));
};

// Read Array document
// To get subscription of the database, use onSnapshot over getDos. After subscription, the data is auto updated
export const getDocumentsOf = (collection_name) => {
  const colRef = getCollectionReferenceOf(collection_name);
  return documentsInDatabase(colRef);
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

export const updateDocumentField = (collection_name, document_id, updatedFieldValues) => {
  const docRef = doc(database, collection_name, document_id);
  return updateDoc(docRef, updatedFieldValues);
};

// Querying the document in a database
export const queryFor = (collection_name, whereFieldName, whereCondition, whereValue, orderByFieldName, ascendingOrDescending) => {
  const colRef = getCollectionReferenceOf(collection_name);
  const query = query(
    colRef,
    where(whereFieldName, whereCondition, whereValue),
    orderBy(orderByFieldName, ascendingOrDescending)
  );
  return documentsInDatabase(query);
}
// Where condition values
// (==) equal to
// (!=) not equal to
// (>) greater than
// (>=) greater than or equal to
// (<) less than
// (<=) less than or equal to
// (in) equal to any of the following
// (not-in) not equal to any of the following
// (array-contains) an array containing
// (array-contains-any) an array containing any