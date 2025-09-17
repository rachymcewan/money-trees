// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getFirestore,
  getCountFromServer,
  query,
  where,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";



export async function getDataFromDocId(database, the_collection, docID){
    const docRef = doc(database, the_collection, docID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
    console.log("the docSnap is: ", docSnap.data());
      // current_data = docSnap.data();
      return docSnap.data()
    }
}

export async function getDocumentsByField(database, the_collection, fieldPath, fieldValue) {
  console.log("in get data from artist name function");
  console.log("field path: ", fieldPath);
  console.log("field value: ", fieldValue);
  const coll = collection(database, the_collection);
  const query_ = query(coll, where(fieldPath, "==", fieldValue));
  const snapshot = await getCountFromServer(query_);
  const querySnapshot = await getDocs(query_);
  var count_v = snapshot.data().count;
  var full_data = querySnapshot;
  return { count_v, full_data };
}
export async function addDocument(database, the_collection, doc_id, doc_dictionary){
  // Add a new document in collection "cities"
  await setDoc(doc(database, the_collection, doc_id), doc_dictionary);
}

export async function addDocNoID(database, the_collection, doc_dictionary){
  // Add a new document in collection "cities"
 const docRef = await addDoc(collection(database, the_collection), doc_dictionary);
}


export async function queryDatabase(database, the_collection) {
  const querySnapshot = await getDocs(collection(database, the_collection));
  var data_array = [];
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    data_array.push(doc.data());
  });
  console.log(querySnapshot[1]);
  return data_array;
}

export async function fullUpdate(database, the_collection, doc_id, data_dictionary, merge_val){
  // if the doc_id doesn't exist then it'll be created
  const dataRef = doc(database, the_collection, doc_id);
  setDoc(dataRef, data_dictionary, { merge: merge_val });  
}

export async function partialUpdate(database, the_collection, doc_id, data_field, data_val){
      const dataRef = doc(database, the_collection, doc_id);
    // Set the "capital" field of the city 'DC'
    await updateDoc(dataRef, {
      data_field: data_val
    });  
    console.log("succesfully updated doc: ", data_field + ": " + "data_val" );
}
// JavaScript code to handle button click and form submission

// DOM elements
const takePhotoBtn = document.getElementById('take-photo');
const overlay = document.getElementById('overlay');
const userInfoForm = document.getElementById('user-info-form');

// Event listener for take photo button
takePhotoBtn.addEventListener('click', () => {
    // Show the overlay
    overlay.style.display = 'block';
});

// Event listener for form submission
userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get user information from the form
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    // Here you can add code to take a photo and add it to the database along with user information
    
    // For now, let's log the user information to the console
    console.log('Username:', username);
    console.log('Email:', email);
    
    // Clear the form
    userInfoForm.reset();
    
    // Hide the overlay
    overlay.style.display = 'none';
});
