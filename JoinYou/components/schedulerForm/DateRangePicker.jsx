import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View } from "react-native";
import { DateRangePicker } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

// import 'react-date-range/dist/styles.css'
// import 'react-date-range/dist/theme/default.css'

const DateRangePicker = () => {

  // date state
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle 
  const refOne = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
    document.addEventListener("click", hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if( e.key === "Escape" ) {
      setOpen(false)
    }
  }

  // Hide dropdown on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if( refOne.current && !refOne.current.contains(e.target) ) {
      setOpen(false)
    }
  }

  return (
    <View style={{ calendarWrap }}>

      <TextInput
        value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        className="inputBox"
        onClick={ () => setOpen(open => !open) }
      ></TextInput>

      <View ref={{ refOne }}>
        {open && 
          <DateRangePicker
            onChange={item => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="vertical"
            className="calendarElement"
          />
        }
      </View>

    </View>
  )
}

// const styles = StyleSheet.create({
//   body: {
//     padding: 40,
//   },

//   App: {
//     text-align: center,
//     font-size: 22,
//   },

//   input.inputBox {
//     font-size: 22,
//     padding: 5, 8, 4, 8,
//     border-radius: 3,
//     border: 1, solid #666,
//   },
  
//   calendarWrap {
//     display: inline-block,
//     position: relative,
//   },
  
//   calendarElement {
//     position: absolute,
//     left: 50%,
//     transform: translateX(-50%),
//     top: 40p,
//     border: 1, solid #ccc,
//     z-index: 999,
//   }

// })


export default DateRangePicker;