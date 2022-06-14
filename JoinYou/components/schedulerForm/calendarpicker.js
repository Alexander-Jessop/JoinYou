import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableNighlight, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/dateTimepicker';

import moment from 'moment';

const CustomDatePicker = (props) => {
    return (
        <TouchableHighlight style={{ flex: 1, marginTop: 50 }}>
            activeOpacity=(0)
            onPress={() => console.log('open datepicker')}>
            <Text>{moment().format('YYY-MM-DD')}</Text>
        </TouchableHighlight>
    )
};
CustomDatePicker.defaultProp = {

    //
};

export default CustomDatePicker;
