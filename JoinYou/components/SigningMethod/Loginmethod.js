mport React, { useState } from "react";
import {
    Text, View, Image, ImageBackground, StatusBar, SafeAreaView, TouchableOpacity,
    StyleSheet
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts, Sizes } from "../../constant/styles";
import IntlPhoneInput from 'react-native-intl-phone-input';

const WelcomeScreen = ({ navigation }) => {

    const [phoneNumber, setPhoneNumber] = useState('');

    function phoneNumberInput() {
        return (
            <IntlPhoneInput
                onChangeText={({ phoneNumber }) => setPhoneNumber(phoneNumber)}
                defaultCountry="CAN"
                containerStyle={styles.phoneNumberContainerStyle}
                placeholder="Phone Number"
                dialCodeTextStyle={{ ...Fonts.white16Regular }}
                phoneInputStyle={{ flex: 1, marginLeft: Sizes.fixPadding + 20.0, ...Fonts.white16Regular }}
            />
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity activeOpacity={0.9}
                onPress={() => navigation.navigate('Verification')}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['rgba(68,114,152,0.99)', 'rgba(25,118,210,0.5)',]}
                    style={{
                        paddingVertical: Sizes.fixPadding + 5.0,
                        borderRadius: Sizes.fixPadding * 3.0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: Sizes.fixPadding * 5.0,
                    }}
                >
                    <Text style={{ ...Fonts.white16Regular }}>
                        Countinue
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    function otpText() {
        return <Text style={{
            ...Fonts.white16Regular,
            textAlign: 'center',
            marginTop: Sizes.fixPadding * 2.0,
        }}>We'll send OTP for Verification</Text>
    }

    function facebookButton() {
        return <View
            style={styles.faceBookButtonContainerStyle}>
            <Image source={require('../../assets/images/facebook.png')}
                style={{ height: 30.0, width: 30.0 }}
                resizeMode="contain"
            />
            <Text style={{ ...Fonts.white16Regular, marginLeft: Sizes.fixPadding }}>Log in with Facebook</Text>
        </View>
    }

    function googleButton() {
        return <View
            style={styles.googleButtonContainerStyle}>
            <Image source={require('../../assets/images/google.png')}
                style={{ height: 30.0, width: 30.0 }}
                resizeMode="contain"
            />
            <Text style={{ ...Fonts.black16Regular, marginLeft: Sizes.fixPadding }}>Log in with Google</Text>
        </View>
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../../assets/images/influencer.jpg')}
            >
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    colors={['black', 'rgba(0,0.10,0,0.80)', 'rgba(0,0,0,0.20)',]}
                    style={{ flex: 1, paddingHorizontal: Sizes.fixPadding * 2.0 }}
                >
                    <Text style={{ ...Fonts.white30Bold, marginTop: 100.0, }}>Welcome!</Text>
                    <Text style={{ ...Fonts.white16Regular, marginTop: Sizes.fixPadding }}>Login in your account</Text>
                    {phoneNumberInput()}
                    {continueButton()}
                    {otpText()}
                    {facebookButton()}
                    {googleButton()}
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    phoneNumberContainerStyle: {
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: Sizes.fixPadding + 15.0,
        marginTop: Sizes.fixPadding * 9.0,
    },
    faceBookButtonContainerStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 5.0,
        backgroundColor: '#3B5998',
    },
    googleButtonContainerStyle: {
        paddingVertical: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding * 3.0,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 4.0,
        backgroundColor: 'white',
    }
})

WelcomeScreen.navigationOption = () => {
    return {
        header: () => null
    }
}

export default WelcomeScreen;