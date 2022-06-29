import functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
// import { collection, doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from 'firebase-admin/firestore';

const app = initializeApp();  // uses current Firebase project’s config
const firestore = getFirestore(app);


export const getNumberOfUsers = functions.https.onCall(
  async (data, context) => {
    try {
      let userCollRef = firestore.collection('users');
      let querySnap = await userCollRef.get();
      // functions.logger.log(`request from: ${context.auth.token.email}`);
      functions.logger.log(`num of users: ${querySnap.size}`);
console.log("testing console", querySnap.size)
      return { numUsers: querySnap.size };
    } catch (ex) {
      functions.logger.info(`ERROR: ${ex.message}`);
      throw ex;
}})


