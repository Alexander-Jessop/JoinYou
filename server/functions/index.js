import functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, addDoc, collection } from 'firebase-admin/firestore';
// import admin from 'firebase-admin';

const app = initializeApp();  // uses current Firebase project’s config
const firestore = getFirestore(app);

// //  first version
// export const getNumberOfUsers = functions.https.onCall(
//   async (data, context) => {
//     try {
//       let userCollRef = firestore.collection('users');
//       let querySnap = await userCollRef.get();
//       // functions.logger.log(`request from: ${context.auth.token.email}`);
//       functions.logger.log(`num of users: ${querySnap.size}`);
//       return { numUsers: querySnap.size };
//     } catch (ex) {
//       functions.logger.info(`ERROR: ${ex.message}`);
//       throw ex;
// }})


// //  Add a user to the database
// export const addRandoUser = functions.https.onCall(
//   async (data, context) => {
//     try{
//       let userCollRef = firestore.collection('users');
//       const docRef = await addDoc(collection(userCollRef, "users"), {
//         displayName: "FakeName" + (count+1),
//         email: "FakeEmail"+(count+1)
//       });
//       console.log("Document writen with ID:", docRef.id)
//       return docRef
//     }catch(ex) {
//       console.log('yikes! ', ex.message);
//       throw ex;
//     }
//     }
// )


//  Agregaritng counts
     export const fsUsersOnCreate = functions.firestore
      .document('users/{docId}')
      .onCreate(async (docSnap, context) => {
        try {
          const newUser = docSnap.data();
          functions.logger.log(`new user! ${newUser.email}`);
          const aggDocRef = firestore.doc("stats/users");
          return aggDocRef.update(
            {count: admin.firestore.FieldValue.increment(1)});
          } catch (ex) { 
            functions.logger.info(`ERROR: ${ex.message}`);
          throw ex;
        }});

        // //  efficiently get the users
        // export const getNumberOfHeroes2 = functions.https.onCall(async(data, context) =>
        // {
        // try {
        //   let aggDocRef = firestore.doc("stats/users");
        //   let docSnap = await aggDocRef.get(aggDocRef);
        //   let theCount = docSnap.data().count;
        //   functions.logger.log(`request from: ${context.auth.token.email}`);
        //   functions.logger.log(`num of users2: ${theCount}`);
        //   return { numUsers: theCount };
        // } catch (ex) {
        //   functions.logger.info(`ERROR: ${ex.message}`);
        //   throw ex;
        // }});

//  Do an onCall
export const initializeNewUnfluencer = functions.https.conCall(
  async (data, context) => {
    try {
      let theUid = context.auth.uid;
      let theEmail = context.auth.token.email;
console.log(`the UID is: `, theUid);

console.log(`the data is:`, data);
let theStartTime = data.startTime;
let theMeetingLength = data.meetingLength;
let theNumMeetings = data.numMeetings;

for (let i = 0; i < themeetings; i++) {
  let meetingCollRef = firestore.collection('meetings');
  let docSnap = await meetingCollRef.add({
    uid: theUid,
    email: theEmail,
startTime: theStartTime + i * theMeetingLength /60,
  });
  console.log(`the new docID is:`, docSnap.id)
}
    }catch (ex){
      functions.logger.info(`ERROR: ${ex.message}`);
      throw ex;
    }
  }
)