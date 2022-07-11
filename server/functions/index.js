import functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp(); // uses current Firebase project’s config
const firestore = getFirestore(app);

//  Do an onCall
export const initializeNewInfluencer = functions.https.onCall(
  async (data, context) => {
    try {
      let theUid = context.auth.uid;
      let theEmail = context.auth.token.email;
      console.log(`the UID is: `, theUid);

      console.log(`the data is:`, data);
      let theStartTime = data.startTime;
      let theMeetingLength = data.meetingLength;
      let theNumMeetings = data.numMeetings;

      for (let i = 0; i < theNumMeetings; i++) {
        let meetingCollRef = firestore.collection("meetings");
        let docSnap = await meetingCollRef.add({
          uid: theUid,
          email: theEmail,
          startTime: theStartTime + (i * theMeetingLength) / 60,
        });
        console.log(`the new docID is:`, docSnap.id);
      }

    } catch (ex) {
      functions.logger.info(`ERROR: ${ex.message}`);
      throw ex;
    }


  }
);