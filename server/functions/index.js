import functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp(); // uses current Firebase project’s config
const firestore = getFirestore(app);
// // firebase function
export const firebaseFunction = functions.https.onCall(
  async (data, context) => {
    try{
    console.log("CONTEXT IS =================", context);
    let influencerUid = context.auth.uid;
    let influencerEmail = context.auth.token.email;
    let startTime = data.startTime;
    let endTime = data.endTime;
    let msPerMinute = 60 * 1000;
    let meetingLength = 15;
    let minutesBetween = (endTime - startTime) / msPerMinute;
    let numMeetings = minutesBetween / meetingLength;
    for (let i = 0; i < numMeetings; i++) {
      let start = startTime.valueOf() + i * meetingLength * msPerMinute;
      let end = start + meetingLength * msPerMinute;
      let meeting = {
        start: new Date(start),
        end: new Date(end),
      }; //end of meeting object
      console.log(meeting);
      // do the firebase create timeslot for each meeting here
      let meetingCollRef2 = firestore.collection("newmeetings");
      let docSnap2 = await meetingCollRef2.add({
        influencerUid: influencerUid,
        influencerEmail: influencerEmail,
        meetingStart: meeting.start,
        meetingEnd: meeting.end,
      });

      console.log(`*******the new docID is:*******`, docSnap2.id);
    } // end of FOR
    } // end of try
    catch(ex){
      functions.logger.info(`ERROR IS:::: ${ex.message}`);
      throw ex;
    } // end of catch
  } // end of async
);
