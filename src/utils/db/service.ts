import app from './firebase';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
const fireStore = getFirestore(app);

export async function retrieveDatas(collectionName : string) {
  const snapshot = await getDocs(collection(fireStore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data
}
