import firebaseconfig from '@/firebaseconfig';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import React, { VFC } from 'react';
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from 'reactfire';
import { RecoilRoot } from 'recoil';

interface Props {
  children?: React.ReactNode;
}

const App: VFC<Props> = (props) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseconfig}>
      <MyApp>{props.children}</MyApp>
    </FirebaseAppProvider>
  );
};

const MyApp: VFC<Props> = (props) => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  const storageInstance = getStorage(useFirebaseApp());
  const authInstance = getAuth(useFirebaseApp());
  return (
    <AuthProvider sdk={authInstance}>
      <StorageProvider sdk={storageInstance}>
        <FirestoreProvider sdk={firestoreInstance}>
          {props.children}
        </FirestoreProvider>
      </StorageProvider>
    </AuthProvider>
  );
};

export default App;
