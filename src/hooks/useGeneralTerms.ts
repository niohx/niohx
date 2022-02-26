import GeneralTermsModel from '@/models/generalterms';
import { User } from 'firebase/auth';
import {
  doc,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { v4 as uuidv4 } from 'uuid';

const uid = uuidv4();

const generalTermsConverter = {
  toFirestore(terms: GeneralTermsModel): DocumentData {
    return terms;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): GeneralTermsModel {
    const data = snapshot.data(options)! as GeneralTermsModel;
    return data;
  },
};

const useGeneralTerms = (
  user: User,
): [GeneralTermsModel, (arg: string) => Promise<void>] => {
  //constructor for hooks

  const newGeneralTerms: GeneralTermsModel = {
    uid: uid,
    createdAt: new Date(),
    generalTerms: 'new general terms',
  };
  const [generalTerms, setGeneralTerms] =
    useState<GeneralTermsModel>(newGeneralTerms);
  console.log(newGeneralTerms);
  const firestore = useFirestore();
  const generalTermsRef = doc(
    firestore,
    `/user/${user.uid}/pages`,
    'generalTerms',
  ).withConverter(generalTermsConverter);
  const { status, data } = useFirestoreDocData(generalTermsRef);

  const readGeneralTerms: () => Promise<void> = async () => {
    if (status === 'success') {
      if (data == undefined) {
        console.log('new terms');
        await setDoc(generalTermsRef, newGeneralTerms);
        setGeneralTerms(newGeneralTerms);
      } else {
        setGeneralTerms(data);
      }
    }
  };
  useEffect(() => {
    readGeneralTerms();
  }, [data]);
  const modifyGeneralTerms: (arg: string) => Promise<void> = async (arg) => {
    await setDoc(generalTermsRef, { ...data, generalTerms: arg });
  };
  return [generalTerms, modifyGeneralTerms];
};

export default useGeneralTerms;
