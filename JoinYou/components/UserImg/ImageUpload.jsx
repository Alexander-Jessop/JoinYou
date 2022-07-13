import { storage } from "../myFirebase";
import { ref, child, put } from "firebase/storage";

/**
 * Uploads data from given `uri` to Firebase Storage and returns
 *
 * @param {URI} imagePickerResult the URI for the data to be uploaded
 * @param {string} storageFolderName the name of the storage folder
 * @param {function} progressCallback called by Firebase Storage as the upload progresses
 * @param {function} downloadUrlCallback called by Firebase Storage and passes the downloadURL to it
 */
export const fbUriToFirebaseStorage = async (
  imagePickerResult,
  storageFolderName,
  progressCallback = null,
  downloadUrlCallback = null
) => {
  try {
    const filename =
      cuid() + "." + tick8sGetFileExtension(imagePickerResult.uri);

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
        uploadTask.snapshot.ref
          .getDownloadURL()
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
  blob,
  filename,
  storageFolderName
) => {
  const user = fbCurrentUser();
  const storageRef = ref(myStorage);
  if (!storageFolderName) {
    storageFolderName = `${MiscConstants.STORAGE_FOLDER_USER}/${user.uid}/${MiscConstants.STORAGE_FOLDER_MISC}`;
  }
  let childRef = child(storageRef, `${storageFolderName}/${filename}`);
  return put(childRef, blob);
};
