import React, { useContext, useState, useEffect, createContext } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import {  auth, db } from "../firebase/config";

const FireBaseContext = createContext();

export const useFireBase = () => useContext(FireBaseContext);

export const FireBaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  function login(email, password) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCurrentUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode}:${errorMessage}`);
      });
    setLoading(false);
  }

  function logOut() {
    setLoading(true);
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
    setLoading(false);
  }

  const loadDocs = async () => {
    let temp = [];
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "teams"));
      querySnapshot.forEach((doc) => {
        const tempObj = {
          ...doc.data(),
          id: doc.id,
        };
        temp.push(tempObj);
      });
      setData(temp);
      // console.log(querySnapshot.docs);
      // const washingtonRef = doc(db, "teams", "JZ89xIWrmHT4AxMbsu94");
      // console.log(washingtonRef)
    } catch (error) {
      console.log(error);
    }
    console.log(data);
    setLoading(false);
  };
    
 const updateScore = async (id,score, newScore) => {
   newScore = parseInt(newScore);
   try {
     const docRef = doc(db, "teams", id);

     await updateDoc(docRef, {
       score: score + newScore,
       timestamp: serverTimestamp(),
     });
     loadDocs();
   } catch (error) {
     alert(error);
   }
 };
    
    
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          setLoading(false);
        });

        return unsubscribe;
      }, []);
    
    const values = {
        currentUser,
        data,
        loading,
        login,
        logOut,
        loadDocs,
        updateScore
    }

    return (
        <FireBaseContext.Provider value={values}>
            {children}
        </FireBaseContext.Provider>
    )
};
