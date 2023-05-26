import { storage } from "../firebase/firebase";
import { ref } from "firebase/storage";
import uuid from "react-native-uuid";
import { uploadBytes } from "firebase/storage";

import processImage from "./processImage";

async function uploadToFirebase(image) {
  try {
    const blob = await processImage(image);
    const filename = uuid.v4();
    const storageRef = ref(storage, filename);
    await uploadBytes(storageRef, blob);
    return filename;
  } catch (err) {
    console.log(err);
  }
}

export default uploadToFirebase;
