import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableHighlight, View, Platform, } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import moment from "moment";

const CustomDatePicker = (props) => {
  const { textStyle, defaultDate } = props;
  const [date, setDate] = useState(moment(defaultDate));
  const [show, setShow] = useState(false);

  const onChange = (e, selectedDate) => {
    setDate(moment(selectedDate));
  }

  const onAndroidChange = (e, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(moment(selectedDate));
      props.onDateChange(selectedDate);
    }
  }

  const onCancelPress = () => {
    setDate(moment(defaultDate));
    setShow(false);
  }

  const onDonePress = () => {
    props.onDateChange(date);
    setShow(false);
  }

  const renderDatePicker = () => {
    return (
      <DateTimePicker
        timeZoneOffsetInMinutes={0}
        value={new Date(date)}
        mode="date"
        minimumDate={new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))}
        maximumDate={new Date(moment().format('YYYY-MM-DD'))}
        onChange={Platform.OS === 'ios' ? onChange : onAndroidChange}
      />
    );

  }

  return (
    <TouchableHighlight
      activeOpacity={0}
      onPress={() => setShow(true)}>
      <View
        <Text style={textStyle}>{date.format('YYYY-MM-DD')}</Text>

        {Platform.OS != 'ios' && show && renderDatePicker()}

        {Platform.OS === 'ios' && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={show}
            supportedOrientaions={["portrait"]}
            onRequestClose={() => setShow(false)}>
            <View style={{ flex: 1 }}>
              <TouchableHighlight
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  flexDirection: "row",
                }}
                activeOpacity={1}
                visible={show}
                onPress={() => setShow(false)}
              >
                <TouchableHighlight
                  underlayColor={"#FFFFFF"}
                  style={{
                    flex: 1,
                    borderTopColor: '#E9E9E9',
                    borderTopWidth: 1,
                  }}
                  onPress={() => console.log('datepicker clicked')}
                >
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      height: 256,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ marginTop: 20 }}>
                      {renderDatePicker()}
                    </View>
                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={onCancelPress}
                      style={[styles.btnText, styles.btnCancel]}>
                      <Text>
                        Cancel
                      </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                      underlayColor={'transparent'}
                      onPress={onDonePress}
                      style={[styles.btnText, styles.btnDone]}>
                      <Text>
                        Done
                      </Text>
                    </TouchableHighlight>

                  </View>
                  
                </TouchableHighlight>
              </TouchableHighlight>
            </View>
          </Modal>
        )}
  </View>
    </TouchableHighlight >
      )
};

CustomDatePicker.defaultProps = {
  textStyle: {},
  defaultDate: moment(),
  onDateChange: () => {},
};

const styles = StyleSheet.create({
  btnText: {
    position: 'absolute',
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alighItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
    left: 0,
  },
  btnDone: {
    right: 0,
  }
})

export default CustomDatePicker;
