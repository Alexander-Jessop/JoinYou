import React from "react";
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

const availableSlots = [
  "8:00",
  "8:20",
  "8:40",
  "9:00",
  "9:20",
  "9:40",
  "10:00",
  "10:20",
  "10:40",
  "11:00",
  "11:20",
  "11:40",
];

// REPLACE WITH FIREBASE TIMESLOTS

const Booking = () => {
  // FUNCTION TO GET INFLUENCERS DATA SUCH AS IMAGE NAME EXPERIECE ETC FROM FIREBASE BASED ON PROFILE ID

  const [selectedSlot, setSelectedSlot] = React.useState("");
  const [book, setBook] = React.useState(false);

  function influencerInfo() {
    return (
      <View>
        <View>{/* pull avatar from database and set in a view */}</View>
        <View>
          <View>
            <Text>DisplayName </Text>
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
          onPress={() =>
            navigation.navigate("Consultation", {
              image,
              name,
              experience,
              type,
              selectedSlot,
              rating,
            })
          }
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
