import { View, Text } from 'react-native'
import React from 'react'
import CustomDatePicker from "../components/schedulerForm/CustomDatePicker";


const TestScreen = () => {
  return (
    <View style={{ flex: 1, marginTop: 50 }}>
    <View style={{ marginHorizontal: 20 }}>
      <Text>Calendar</Text>
      <CustomDatePicker
        textStyle={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: "gray",
        borderWidth: 1,
        }}
        defaultDate="2020-01-01"
        onDateChange={(value) => console.log('Date changed: ' + value)}
      />
    </View>
  </View>
  )
}

export default TestScreen