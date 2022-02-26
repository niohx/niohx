import { User } from 'firebase/auth';
import {
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  setDoc,
  doc,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';

const OrderConverter = {
  toFirestore(order: WithFieldValue<string[]>): DocumentData {
    return { order: order };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    return snapshot.data(options)['order'] as string[];
  },
};

const useFloorOrder = (
  user: User,
): [string, string[], (args: string[]) => Promise<void>] => {
  const firestore = useFirestore();
  const FloorModelsRef = doc(
    firestore,
    `/user/${user.uid}/pages/floorMap`,
  ).withConverter(OrderConverter);
  const { status, data } = useFirestoreDocData(FloorModelsRef);
  useEffect(() => {}, [status]);
  const updateOrder: (args: string[]) => Promise<void> = async (args) => {
    await setDoc(FloorModelsRef, args);
  };
  return [status, data, updateOrder];
};

export default useFloorOrder;
