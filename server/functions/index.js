import functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp(); // uses current Firebase project’s config
const firestore = getFirestore(app);

//  Do an onCall
export const initializeNewInfluencer = functions.https.onCall(
  async (data, context) => {
    try {
      // Bringing the data in from the front end:
      let influencerUid = context.auth.uid;
      let influencerEmail = context.auth.token.email;
      let theStartTime = data.startTime;
      let theEndTime = data.endTime;
      let theMeetingLength = data.meetingLength;
      let theNumMeetings = (theEndTime - theStartTime);
      console.log(`Number of meetings is:`, theNumMeetings);

      for (let i = 0; i < theNumMeetings; i++) {
        let meetingCollRef = firestore.collection("meetings");
        let docSnap = await meetingCollRef.add({
          influencerUid: influencerUid,
          influencerEmail: influencerEmail,
          slotStartTimeCalc: theStartTime + (i * theMeetingLength) / 60,
          slotStartTime: theStartTime,
          slotEndTime: theEndTime,
          meetingLength: theMeetingLength,
          NumberOfMeetings: theNumMeetings,
        });
        console.log(`the new docID is:`, docSnap.id);
      }
    } catch (ex) {
      functions.logger.info(`ERROR: ${ex.message}`);
      throw ex;
    }
  }
);
