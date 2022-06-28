import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../src/AuthProvider";

// REPLACE WITH FIREBASE TIMESLOTS

const Booking = (props) => {
  // FUNCTION TO GET INFLUENCERS DATA SUCH AS IMAGE NAME EXPERIECE ETC FROM FIREBASE BASED ON PROFILE ID

  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [book, setBook] = useState(false);
  const [timeslotData, setTimeslotData] = useState([]);

  const { navigation, route } = props;

  const profileData = route.params.profileData;
  const profileID = profileData.uid;

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  const authContext = useContext(AuthContext);
  const createTimeslots = authContext.createTimeslots;

  useEffect(() => {
    const getData = async () => {
      //Get a single document from Firestore databse, by UID
      //https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
      const docRef = doc(db, "Timeslots", "p73cCe15IWWz0DnZOsFv");
      const docSnap = await getDoc(docRef);
      setTimeslotData(docSnap.data());
    };
    getData();
  }, []);

  const availableSlots = timeslotData.timeSlots;
  console.log("profileData is: ", profileData);
  console.log("timeslotData is: ", timeslotData);
  console.log("selectedSlot is: ", selectedSlot);

  function pressHandler(selectedDate) {
    // console.log("selectedDate is: ", selectedDate);
    setSelectedDate(selectedDate);
  }

  function influencerInfo() {
    return (
      <View>
        <View>{/* pull avatar from database and set in a view */}</View>
        <View>
          <View>
            <Text>{profileData.displayName} </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ProfilePage")}>
            <Text>View Profile</Text>
          </TouchableOpacity>
        </View>
        <Text>Type of Influencer</Text>

        <Text>cost of appoint: $60 </Text>
      </View>
    );
  }

  //   data.length to return # of available pos.
  function slotsInfo() {
    return (
      <View>
        <Text>Available Slots</Text>
      </View>
    );
  }

  function slotsTime({ slots, time }) {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedSlot(`${item} ${time}`);
            setBook(true);
          }}
        >
          <View
            style={{
              backgroundColor:
                selectedSlot == `${item} ${time}` ? "#007F5F" : "white",
              borderColor:
                selectedSlot == `${item} ${time}` ? "#007F5F" : "#CDCDCD",
            }}
          >
            <Text>
              {item} {time}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View>
        <FlatList
          data={slots}
          keyExtractor={(index) => `${index}`}
          renderItem={renderItem}
          scrollEnabled={false}
          numColumns={3}
        />
      </View>
    );
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedSlot(`${item} PM`);
          setBook(true);
        }}
      >
        <View
          style={{
            backgroundColor: selectedSlot == `${item} PM` ? "#007F5F" : "white",
            borderColor: selectedSlot == `${item} PM` ? "#007F5F" : "#CDCDCD",
            ...styles.slotContainerStyle,
          }}
        >
          <Text>{item} PM</Text>
        </View>
      </TouchableOpacity>
    );
  };

  function bookingInfo() {
    return book ? (
      <View>
        <TouchableOpacity
          onPress={() => {
            createTimeslots(selectedSlot);

            navigation.navigate("Confirmation", {
              selectedSlot,
              selectedDate,
            });
          }}
        >
          <View>
            <Text>Book now</Text>
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  }

  const datesBlacklistFunc = (date) => {
    return date.isoWeekday() === 7;
  };

  function calendar() {
    return (
      <View>
        <View style={{}}>
          <CalendarStrip
            style={{ height: 100 }}
            highlightDateContainerStyle={{
              backgroundColor: "#007F5F",
              alignItems: "center",
              justifyContent: "center",
            }}
            dateNumberStyle={{ color: "black", fontSize: 17.0 }}
            dateNameStyle={{ color: "black", fontSize: 15.0 }}
            highlightDateNameStyle={{ color: "white", fontSize: 15.0 }}
            highlightDateNumberStyle={{ color: "white", fontSize: 17.0 }}
            datesBlacklist={datesBlacklistFunc}
            disabledDateOpacity={0.6}
            disabledDateNameStyle={{ color: "gray", fontSize: 15.0 }}
            disabledDateNumberStyle={{ color: "gray", fontSize: 17.0 }}
            useIsoWeekday={false}
            scrollable={true}
            upperCaseDays={false}
            styleWeekend={true}
            onDateSelected={(day) => {
              pressHandler(day);
            }}
          />
        </View>
      </View>
    );
  }

  function divider() {
    return <View style={styles.dividerStyle}></View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar />
      {
        <View style={{ flex: 1 }}>
          {influencerInfo()}
          {calendar()}
          {divider()}
          <FlatList
            ListHeaderComponent={
              <>
                {slotsInfo({
                  data: availableSlots,
                })}
                {slotsTime({ slots: availableSlots, time: "AM" })}
              </>
            }
            renderItem={renderItem}
            keyExtractor={(index) => `${index}`}
            numColumns={3}
          />
          {bookingInfo()}
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  dividerStyle: {
    backgroundColor: "grey",
    height: 0.9,
    width: "100%",
  },
});

export default Booking;
