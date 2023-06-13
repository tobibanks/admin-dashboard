import { storage } from "../firebase/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const useUpload = () => {
  const upload = async (folder, file) => {
    const fileToUpload = ref(
      storage,
      `images/${folder}/${new Date().getTime() + file.name}`
    );
    const url = await uploadBytes(fileToUpload, file).then(async (snapshot) => {
      const imgURL = await getDownloadURL(snapshot.ref);
      return imgURL;
    });
    return url;
  };

  return { upload };
};
