import { User } from 'firebase/auth';
import {
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  setDoc,
  doc,
} from 'firebase/firestore';
import { useFirestore, useFirestoreDocData } from 'reactfire';

const MenuConverter = {
  toFirestore(order: WithFieldValue<string[]>): DocumentData {
    return { order: order };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
    return snapshot.data(options)['order'] as string[];
  },
};

const useMenuOrder = (
  user: User,
): [string, string[], (args: string[]) => Promise<void>] => {
  const firestore = useFirestore();
  const MenuModelsRef = doc(
    firestore,
    `/user/${user.uid}/pages/Menus`,
  ).withConverter(MenuConverter);
  const { status, data } = useFirestoreDocData(MenuModelsRef);

  const updateOrder: (args: string[]) => Promise<void> = async (args) => {
    await setDoc(MenuModelsRef, args);
  };

  return [status, data, updateOrder];
};

export default useMenuOrder;
