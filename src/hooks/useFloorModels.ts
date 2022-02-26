import FloorModel from '@/models/floor';
import { User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  where,
} from 'firebase/firestore';
type CRUD = {
  update: (arg: FloorModel) => Promise<void>;
  delete: (arg: FloorModel) => Promise<void>;
};
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { useEffect } from 'react';
const FloorModelConverter = {
  toFirestore(terms: FloorModel): DocumentData {
    return terms;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): FloorModel {
    const data = snapshot.data(options)! as FloorModel;
    return data;
  },
};

const useFloorModels = (user: User): [string, FloorModel[], CRUD] => {
  const firestore = useFirestore();

  const floorMapRef = collection(
    firestore,
    `/user/${user.uid}/pages/floorMap`,
    'floorModels',
  ).withConverter(FloorModelConverter);
  const { status, data } = useFirestoreCollectionData(floorMapRef);

  // useEffect(() => {}, [data]);
  //CRUD
  const updateFloor: (arg: FloorModel) => Promise<void> = async (arg) => {
    console.log(arg);
    console.log('update!!');
    const docRef = doc(
      firestore,
      `/user/${user.uid}/pages/floorMap/floorModels/`,
      arg.ID,
    );
    await setDoc(docRef, arg);
  };

  const deleteFloor: (arg: FloorModel) => Promise<void> = async (arg) => {
    const q = query(floorMapRef, where('ID', '==', arg.ID));
    const ss = await getDocs(q);
    console.log(ss.docs[0].data());
    if (!ss.empty) {
      await deleteDoc(ss.docs[0].ref);
    }
  };
  return [status, data, { update: updateFloor, delete: deleteFloor } as CRUD];
};

export default useFloorModels;
