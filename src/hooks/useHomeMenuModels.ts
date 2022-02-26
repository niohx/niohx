import HomeMenuModel from '@/models/homeMenu';
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
  update: (arg: HomeMenuModel) => Promise<void>;
  delete: (arg: HomeMenuModel) => Promise<void>;
};
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const HomeMenuModelConverter = {
  toFirestore(terms: HomeMenuModel): DocumentData {
    return terms;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): HomeMenuModel {
    const data = snapshot.data(options)! as HomeMenuModel;
    return data;
  },
};

const useHomeMenuModels = (user: User): [string, HomeMenuModel[], CRUD] => {
  const firestore = useFirestore();

  const HomeMenusRef = collection(
    firestore,
    `/user/${user.uid}/pages/homeMenu`,
    'homeMenuModels',
  ).withConverter(HomeMenuModelConverter);
  const { status, data } = useFirestoreCollectionData(HomeMenusRef);

  // useEffect(() => {}, [data]);
  //CRUD
  const updateHomeMenu: (arg: HomeMenuModel) => Promise<void> = async (arg) => {
    console.log(arg);
    console.log('update!!');
    const docRef = doc(
      firestore,
      `/user/${user.uid}/pages/homeMenu/homeMenuModels`,
      arg.ID,
    );
    await setDoc(docRef, arg);
  };

  const deleteHomeMenu: (arg: HomeMenuModel) => Promise<void> = async (arg) => {
    const q = query(HomeMenusRef, where('ID', '==', arg.ID));
    const ss = await getDocs(q);
    console.log(ss.docs[0].data());
    if (!ss.empty) {
      await deleteDoc(ss.docs[0].ref);
    }
  };
  return [
    status,
    data,
    { update: updateHomeMenu, delete: deleteHomeMenu } as CRUD,
  ];
};

export default useHomeMenuModels;
