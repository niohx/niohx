import MenuModel from '@/models/menu';
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
  update: (arg: MenuModel) => Promise<void>;
  delete: (arg: MenuModel) => Promise<void>;
};
import { useFirestore, useFirestoreCollectionData } from 'reactfire';

const MenuModelConverter = {
  toFirestore(terms: MenuModel): DocumentData {
    return terms;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): MenuModel {
    const data = snapshot.data(options)! as MenuModel;
    return data;
  },
};

const useMenuModels = (user: User): [string, MenuModel[], CRUD] => {
  const firestore = useFirestore();

  const MenusRef = collection(
    firestore,
    `/user/${user.uid}/pages/Menus`,
    'MenuModels',
  ).withConverter(MenuModelConverter);
  const { status, data } = useFirestoreCollectionData(MenusRef);

  // useEffect(() => {}, [data]);
  //CRUD
  const updateMenu: (arg: MenuModel) => Promise<void> = async (arg) => {
    console.log(arg);
    console.log('update!!');
    const docRef = doc(
      firestore,
      `/user/${user.uid}/pages/Menus/MenuModels/`,
      arg.ID,
    );
    await setDoc(docRef, arg);
  };

  const deleteMenu: (arg: MenuModel) => Promise<void> = async (arg) => {
    const q = query(MenusRef, where('ID', '==', arg.ID));
    const ss = await getDocs(q);
    console.log(ss.docs[0].data());
    if (!ss.empty) {
      await deleteDoc(ss.docs[0].ref);
    }
  };
  return [status, data, { update: updateMenu, delete: deleteMenu } as CRUD];
};

export default useMenuModels;
