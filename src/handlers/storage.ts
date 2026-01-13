import {
  ref, 
  uploadBytes, 
  getDownloadURL
} from "firebase/storage";
import { storage } from "../lib/firebase.config";

interface MediaUpload {
    title: string;
    file: File | Blob | Uint8Array;
    path: string;
}

interface UploadResponse {
    path: string;
    name: string;
}

interface MediaDownload {
    path: string;
}

const Storage = {
    uploadFile: (media: MediaUpload) => {

        return new Promise<UploadResponse>(async (resolve, reject) => {
            try {
                if (0) {
                    const mediaRef = ref(storage, `images/${media.title}`);
                    uploadBytes(mediaRef, media.file)
                        .then((snapshot: any) => {
                            resolve({ 
                                path: snapshot.metadata.fullPath, 
                                name: media.title 
                            });
                        })
                        .catch(reject);
                }
                else { // avoid using credit...
                    resolve({ 
                                path: media.path,
                                name: media.title 
                            });
                }

            } 
            catch (e) {
                console.error(e)
            }
        })
    }, 
    downloadFile: (media: MediaDownload): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            try {
                if (0) {
                    const mediaRef = ref(storage, media.path);
                    const fileURL = await getDownloadURL(mediaRef);
                    resolve(fileURL);
                }
                else {
                    resolve(media.path);
                }
            } 
            catch (e) {
                console.error(e);
                reject(e);
            }
        });
    }
}
export default Storage

