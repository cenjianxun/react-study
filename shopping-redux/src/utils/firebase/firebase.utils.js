import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    getDoc, 
    setDoc, 
    collection, 
    writeBatch, 
    query,
    getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDq6GnG8aoTJZ43KRQoC-NssviraLXknwc",
    authDomain: "shopping-db-57035.firebaseapp.com",
    projectId: "shopping-db-57035",
    storageBucket: "shopping-db-57035.appspot.com",
    messagingSenderId: "769151475543",
    appId: "1:769151475543:web:dda4e95c67d012295c6812"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
    collectionKey, objectToAdd, field) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    //object 就是hat、women、men这些对象
    objectToAdd.forEach((object) => {
        // doc short for document
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit()
    console.log('batch db done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    // 如果要调试错误
    // await Promise.reject(new Error('new error woops))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((docSnapshot) => docSnapshot.data())
}

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    
    //    return userDocRef;
    return userSnapshot
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

// 一直监听，一旦登入等出变化，就callback
export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback)

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsubscribe()
                resolve(userAuth)
            },
            reject
        )
    })
}