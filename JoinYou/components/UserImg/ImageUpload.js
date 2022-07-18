// import { storage } from "../myFirebase";
import {
  ref,
  child,
  put,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

/**
 * Uploads data from given `uri` to Firebase Storage and returns
 *
 * @param {function} storage the storage from Firebase Provider "storage = getStorage(app)
 * @param {object} user (not needed anymore) the data for the currently logged in user
 * @param {image object} imagePickerResult the iamge for the data to be uploaded
 * @param {string} storageFolderName the name of the storage folder
 * @param {function} progressCallback called by Firebase Storage as the upload progresses
 * @param {function} downloadUrlCallback called by Firebase Storage and passes the downloadURL to it
 */
export const fbUriToFirebaseStorage = async (
  storage,
  // user,
  imagePickerResult,
  storageFolderName,
  progressCallback = null,
  downloadUrlCallback = null
) => {
  try {
    // const filename =
    //   cuid() + "." + tick8sGetFileExtension(imagePickerResult.uri);
    // console.log("imagePickerResult.uri", imagePickerResult.uri);
    const filename = imagePickerResult.uri.split("ImagePicker/")[1];

    // console.log("filename is:", filename);

    // From: https://github.com/expo/examples/blob/master/with-firebase-storage-upload/App.js
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imagePickerResult.uri, true);
      xhr.send(null);
    });

    const uploadTask = fbUploadToFirebaseStorage(
      storage,
      // user,
      blob,
      filename,
      storageFolderName
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progressCallback &&
          progressCallback(snapshot.bytesTransferred / snapshot.totalBytes);
      },
      (error) => {
        console.error("ERROR uploading image:", error.message);
        throw error;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl) => {
            downloadUrlCallback && downloadUrlCallback(downloadUrl);
          })
          .catch((error) => {
            console.error(`ERROR updating user profile pic: ${error.message}`);
          })
          .finally(() => {
            blob.close(); // release the blob!
          });
      }
    );
  } catch (ex) {
    console.error("Exception from fbUriToFirebaseStorage(): ", ex.message);
  }
};

/**
 *
 * @param {Blob} blob - the data of the file being uploaded
 * @param {string} filename - name to use for file storage
 * @param {string} storageFolderName - name of folder in Firebase Storage; if null, default's to user's "misc" folder
 *
 * @returns an `UploadTask` from Firebase Storage API
 * @see https://firebase.google.com/docs/reference/js/firebase.storage.Reference#put
 */
export const fbUploadToFirebaseStorage = (
  storage,
  // user,
  blob,
  filename,
  storageFolderName
) => {
  // const user = fbCurrentUser();
  //mySTorage = storage from fb
  // const storageRef = ref(storage);
  // if (!storageFolderName) {
  //   storageFolderName = `${MiscConstants.STORAGE_FOLDER_USER}/${user.uid}/${MiscConstants.STORAGE_FOLDER_MISC}`;
  // }
  let imageRef = ref(storage, `${storageFolderName}/${filename}`);
  return uploadBytesResumable(imageRef, blob);
};
