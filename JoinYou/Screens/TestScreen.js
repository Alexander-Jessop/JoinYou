import { View, Text, useEffect, useRef, useState } from 'react'
import React from 'react'
// import CustomDatePicker from "../components/schedulerForm/CustomDatePicker";
import DateRangePicker from '../components/schedulerForm/DateRangePicker';

const TestScreen = () => {
  return (
    <View style={{ flex: 1, marginTop: 50 }}>
    <View style={{ marginHorizontal: 20 }}>
      <Text>Calendar</Text>
      <DateRangePicker
        textStyle={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: "gray",
        borderWidth: 1,
        }}
        defaultDate="01-06-2022"
        onDateChange={(value) => console.log('Date changed: ' + value)}
      />
    </View>
  </View>
  )
}

export default TestScreen