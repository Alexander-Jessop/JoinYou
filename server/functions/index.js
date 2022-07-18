import functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp(); // uses current Firebase project’s config
const firestore = getFirestore(app);

// // Timeslot parsing function 15 minutes
export const createTimeslots = functions.https.onCall(
  async (data, context) => {
    try{
    // console.log("CONTEXT IS =================", context.auth.token);
    let influencerUid = context.auth.uid;
    let influencerName = data.influencerName
    let influencerEmail = context.auth.token.email;
    let startTime = data.startTime.valueOf();
    let endTime = data.endTime.valueOf();
    let msPerMinute = 60 * 1000;
    let meetingLength = 15;
    let minutesBetween = (endTime - startTime) / msPerMinute;
    let numMeetings = minutesBetween / meetingLength;
    for (let i = 0; i < numMeetings; i++) {
      let start = startTime + i * meetingLength * msPerMinute;
      let end = start + meetingLength * msPerMinute;
      let meeting = {
        start: new Date(start),
        end: new Date(end),
      }; //end of meeting object
      console.log(meeting);
      // do the firebase create timeslot for each meeting here
      let meetingCollRef2 = firestore.collection("Timeslots");
      let docSnap2 = await meetingCollRef2.add({
        influencerId: influencerUid,
        influencerName: influencerName, 
        influencerEmail: influencerEmail,
        endTime: meeting.end,
        startTime: meeting.start,
        booked: false,
        clientId: null,
        clientName: null,
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

// Client appointment selection

