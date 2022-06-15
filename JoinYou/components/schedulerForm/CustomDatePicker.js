import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableHighlight, View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import moment from 'moment';

const CustomDatePicker = (props) => {
    const { textStyle } = props;
    const [date, setDate] = useState(moment());
    const [show, setShow] = useState(false);

    const onChange = (e, selectDate) => {
        setDate(moment(selectDate));

    }

    return (
        <TouchableHighlight 
            activeOpacity={0}
            onPress={() => setShow(true)}>
            <View>
                <Text style={textStyle}>{moment().format('YYYY-MM-DD')}</Text>
                
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={show}
                    supportedOrientaions={['portrait']}
                    onRequestClose={() => setShow(false)}>
                    <View style={{ flex: 1 }}>
                        <TouchableHighlight
                            style={{
                                flex: 1,
                                alignItems: 'flex-end',
                                flexDirection: 'row',
                            }}
                            activeOpacity={1}
                            visible={show}
                            onPress={() => setShow(false)}>
                            <TouchableHighlight
                                onHideUnderlay={'#FFFFFF'}
                                style={{
                                    flex: 1,
                                    borderTopColor: '#E9E9E9',
                                    borderTopWidth: 1,
                                }}
                                onPress={() => console.log("datepicker Clicked")}>
                                    
                                <View style={{
                                    backgroundColor: '#FFFFFF',
                                    height: 256,
                                    overflow: 'hidden',
                                }}>
                                    <View style={{ marginTop: 20 }}>
                                    
                                     <DateTimePicker
                                        timeZoneOffsetInMinutes={0}
                                            value={new Date(date)}
                                            mode="date"
                                            minimumDate={new Date(moment().subtract(120, 'years').format('YYYY-MM-DD'))}
                                            maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                                            onChange={onChange}
                                        />
                                    </View>
                                </View>

                            </TouchableHighlight>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>   
        </TouchableHighlight>
    )
};

CustomDatePicker.defaultProps = {
    textStyle: {},
};

export default CustomDatePicker;
