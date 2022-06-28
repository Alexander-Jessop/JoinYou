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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../../src/AuthProvider";
import moment from "moment";

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
      const timeslotArray = querySnapshot.docs.map((doc) => doc.data());

      // //Second filter. Filtering by selected category.
      // const filteredByCategory = timeslotArray.filter((expert) => {
      //   return expert.interests.includes(selectedDate);
      // });

      setTimeslotData(timeslotArray);
      let datesAvailable = timeslotArray.map((timeslot) => {
        console.log("timeslot", timeslot);
        return moment.unix(timeslot.startTime.seconds);
      });
      setAvailableDates(datesAvailable);
      console.log("datesAvailable", datesAvailable);
    };
    getData();
  }, [profileID]);

  useEffect(() => {
    let timeslots = timeslotData
      .filter((timeslot) => {
        let momentDate = moment
          .unix(timeslot.startTime.seconds)
          .format("MM/DD/YYYY");
        console.log("momentDate: ", momentDate);
        console.log("selectedDate", selectedDate);
        return momentDate === selectedDate;
      })
      .map((timeslot) => {
        return moment.unix(timeslot.startTime.seconds).format("h:mm a");
      });

    setAvailableSlots(timeslots);
  }, [selectedDate]);

  console.log("availableSlots", availableSlots);
  // let dateString = moment
  //   .unix(timeslotData.startTime.seconds)
  //   .format("MM/DD/YYYY");
  // console.log("dateString: ", dateString);

  // console.log("profileData is: ", profileData);
  // console.log("timeslotData is: ", timeslotData);
  //console.log("selectedSlot is: ", selectedSlot);

  function pressHandler(calendarDate) {
    let dateString = moment(calendarDate).format("MM/DD/YYYY");
    console.log("dateString is: ", dateString);
    setSelectedDate(dateString);
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

  function slotsTime({ slots }) {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedSlot(`${item}`);
            setBook(true);
          }}
        >
          <View
            style={{
              backgroundColor: selectedSlot == `${item} ` ? "#007F5F" : "white",
              borderColor: selectedSlot == `${item} ` ? "#007F5F" : "#CDCDCD",
            }}
          >
            <Text>{item}</Text>
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
    console.log("item", item);
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
                {slotsInfo({
                  data: availableSlots,
                })}
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
};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

const styles = StyleSheet.create({
  dividerStyle: {
    backgroundColor: "grey",
    height: 0.9,
    width: "100%",
  },
});

export default Booking;
