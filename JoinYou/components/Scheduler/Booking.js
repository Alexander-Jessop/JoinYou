import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  StyleSheet,
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import { FirebaseContext } from "../../src/FirebaseProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../src/AuthProvider";
import moment from "moment";
import { Button, Chip, Avatar } from "react-native-paper";

// REPLACE WITH FIREBASE TIMESLOTS

const Booking = (props) => {
  // FUNCTION TO GET INFLUENCERS DATA SUCH AS IMAGE NAME EXPERIECE ETC FROM FIREBASE BASED ON PROFILE ID

  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [book, setBook] = useState(false);
  const [timeslotData, setTimeslotData] = useState([]);

  const { navigation, route } = props;

  const profileData = route.params.profileData;
  const profileID = profileData.uid;

  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;

  useEffect(() => {
    //Get multiple documents from a collection with a filter.
    //Changed .forEach() to .map()
    //https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
    const getData = async () => {
      const q = query(
        collection(db, "Timeslots"),
        where("influencerId", "==", profileID)
      );
      const querySnapshot = await getDocs(q);
      const timeslotArray = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          DOC_ID: doc.id,
        };
      });

      //Second filter. Filtering by booked = false
      const filteredByAvailable = timeslotArray.filter((timeslot) => {
        return timeslot.booked === false;
      });

      //console.log("filteredByAvailable: ", filteredByAvailable);
      setTimeslotData(filteredByAvailable);
      let datesAvailable = filteredByAvailable.map((timeslot) => {
        //console.log("timeslot", timeslot);
        return moment.unix(timeslot.startTime.seconds);
      });
      setAvailableDates(datesAvailable);
      //console.log("datesAvailable", datesAvailable);
    };
    getData();
  }, [profileID]);

  useEffect(() => {
    let timeslots = timeslotData
      .filter((timeslot) => {
        let momentDate = moment
          .unix(timeslot.startTime.seconds)
          .format("MM/DD/YYYY");
        //console.log("momentDate: ", momentDate);
        //console.log("selectedDate", selectedDate);
        return momentDate === selectedDate;
      })
      .map((timeslot) => {
        return {
          ...timeslot,
          startTime: moment.unix(timeslot.startTime.seconds).format("h:mm a"),
        };
      });

    setAvailableSlots(timeslots);
  }, [selectedDate]);

  // console.log("selectedDate: ", selectedDate);
  // console.log("availableSlots", availableSlots);
  // let dateString = moment
  //   .unix(timeslotData.startTime.seconds)
  //   .format("MM/DD/YYYY");
  // console.log("dateString: ", dateString);

  // console.log("profileData is: ", profileData);
  // console.log("timeslotData is: ", timeslotData);

  // console.log("selectedDate is: ", selectedDate);
  // console.log("selectedSlot is: ", selectedSlot);

  function pressHandler(calendarDate) {
    let dateString = moment(calendarDate).format("MM/DD/YYYY");
    // console.log("dateString is: ", dateString);
    setSelectedDate(dateString);
  }

  let avatarID = profileData?.displayName?.substring(0, 1);
  const profileAvatar = () => (
    <Avatar.Text size={100} label={avatarID} backgroundColor="#007F5F" />
  );

  function influencerInfo() {
    return (
      <View>
        <View>{/* pull avatar from database and set in a view */}</View>
        <View>
          <View>
            <Text style={styles.avatar}> {profileAvatar()} </Text>
            <Text style={styles.userName}>{profileData.displayName} </Text>
          </View>
        </View>
        <Text style={styles.expertise}>cost of appoint: $60 </Text>
      </View>
    );
  }

  //   data.length to return # of available pos.
  function slotsInfo(data) {
    //console.log("data", data);
    if (data.length == 0) {
      return (
        <View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 25,
              marginTop: "30%",
            }}
          >
            No Current Available Slots
          </Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.text}>Available Slots</Text>
      </View>
    );
  }

  function slotsTime({ slots }) {
    const renderItem = ({ item }) => {
      return (
        <View style={styles.timeslots}>
          <Chip
            style={styles.chip}
            onPress={() => {
              setSelectedSlot(item);
              setBook(true);
              //console.log("selectedSlot", selectedSlot);
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              {item.startTime}
            </Text>
          </Chip>
        </View>
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
          setSelectedSlot(item);
          setBook(true);
        }}
      >
        <View
          style={{
            backgroundColor: selectedSlot == `${item} ` ? "#007F5F" : "white",
            borderColor: selectedSlot == `${item} ` ? "#CDCDCD" : "#007F5F",
            ...styles.slotContainerStyle,
          }}
        >
          <Text>{item.startTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  function bookingInfo() {
    return book ? (
      <View>
        <Button
          color="#007F5F"
          mode="contained"
          onPress={() => {
            navigation.navigate("Confirmation", {
              selectedSlot,
              selectedDate,
              profileData,
            });
          }}
        >
          Book now
        </Button>
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
            markedDates={availableDates.map((date) => {
              return {
                date: date,
                dots: [{ color: "#007F5F", selectedColor: "white" }],
              };
            })}
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
                {slotsInfo(availableSlots)}
                {slotsTime({ slots: availableSlots })}
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
};;;;;;;;;

const styles = StyleSheet.create({
  dividerStyle: {
    backgroundColor: "grey",
    height: 0.9,
    width: "100%",
    color: "#007F5F",
  },
  avatar: {
    textAlign: "center",
    marginTop: 20,
  },
  expertise: {
    textAlign: "center",
    marginBottom: 15,
  },
  userName: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
  },
  button: {
    marginLeft: 25,
    marginRight: 25,
  },
  view: {
    marginTop: 325,
    width: "90%",
    justifyContent: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 110,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  chip: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#007F5F",
    margin: 5,
    height: 50,
  },
  timeslots: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Booking;
