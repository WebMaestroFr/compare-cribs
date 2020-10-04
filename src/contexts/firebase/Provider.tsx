import React, { FC, useCallback, useEffect } from "react";
import { Firebase, FirebaseData } from "./index";

// This import loads the firebase namespace along with all its type information.
import * as firebase from "firebase/app";
// These imports load individual services into the firebase namespace.
import "firebase/database";

export const FirebaseProvider: FC = ({ children }) => {
  useEffect(() => {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyBEY_VzCdPC2JGCZLKf-EQ4DXhGAbV7ZzU",
      appId: "1:300973941756:web:db15739d45c57cf4efc879",
      authDomain: "lecoincoin-c16f9.firebaseapp.com",
      databaseURL: "https://lecoincoin-c16f9.firebaseio.com",
      measurementId: "G-B18K0TER1G",
      messagingSenderId: "300973941756",
      projectId: "lecoincoin-c16f9",
      storageBucket: "lecoincoin-c16f9.appspot.com",
    });
    // firebase.analytics();
  }, []);

  return (
    <Firebase.Provider
      value={{
        read: useCallback(
          (ref: string) =>
            new Promise((resolve, reject) =>
              firebase
                .database()
                .ref(ref)
                .on(
                  "value",
                  (snapshot) => {
                    const value = snapshot.val();
                    resolve(value);
                  },
                  reject
                )
            ),
          []
        ),
        write: useCallback(
          (ref: string, data: FirebaseData) =>
            firebase.database().ref(ref).set(data),
          []
        ),
      }}
    >
      {children}
    </Firebase.Provider>
  );
};

export default FirebaseProvider;
