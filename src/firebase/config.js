import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid';

const firebaseConfig = {
    apiKey: "AIzaSyCB183hue4sIDx4ogqA-0exHc5YIR656fc",
    authDomain: "lndmrk-64e90.firebaseapp.com",
    projectId: "lndmrk-64e90",
    storageBucket: "lndmrk-64e90.appspot.com",
    messagingSenderId: "422202514688",
    appId: "1:422202514688:web:234436a394192bd0ca67e5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFile(file) {
    let extension = file.name.split('.').pop()
    const storageRef = ref(storage, `3D/${v4()}.${extension}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    const metaData = await getMetadata(storageRef);
    return {url , metaData}
}

export async function deleteFile(file) {
    const storageRef = ref(storage, `3D/${file}`);
    const deleteF = await deleteObject(storageRef)
    return console.log(deleteF)
}