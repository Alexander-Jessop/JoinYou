import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button } from 'react-native-paper';
import { FirebaseContext } from './FirebaseProvider';
import { httpsCallable } from 'firebase/functions';

const CloudFunctions = () => {
    const fbContext = useContext(FirebaseContext);
    const cloudFuncs = fbContext.cloudFuncs;
    const [count, setCount] = useState("n/a");
  
    const getUsersCount = async () => {
      try {
        const getNumberOfUsers = httpsCallable(cloudFuncs, "getNumberOfUsers");
        const result = await getNumberOfUsers();
        const data = result.data;
        console.log(`data is:`, data);
        setCount(data.numUsers);
      } catch(ex) {
        console.log('yikes! ', ex.message);
        throw ex;
      }
    }
  return (
    <View style = {styles.container}>
      <Text>CloudFunctions {count} </Text>
      <Button onPress = {getUsersCount}> click it</Button>
    </View>
  )
}

export default CloudFunctions

const styles = StyleSheet.create({container:{alignItems: "center"}})