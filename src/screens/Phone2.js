// import { View, Text, SafeAreaView, Button, TextInput } from 'react-native'
// import React, { useState } from 'react'
// import { TextInput } from 'react-native-web';

// const Phone2 = () => {

//     const [phoneNumber, setPhoneNumber] = useState('');
//     const createUser = async (phoneNumber) => {
//         // create User schema using post method using axios and async , await
//         try {
//           const response = await axios.post('http://localhost:3000/create-user', {
//             phoneNumber: phoneNumber,
//           });
//           console.log(response);
//           console.warn('database created');
//         } catch (error) {
//           console.log(error);
//         }
//       };
    
//   return (
//     <SafeAreaView>
//         <TextInput
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               placeholder="+910000000000"
//               keyboardType="phone-pad"
//             />

//         <Button onPress={createUser(phoneNumber)}></Button>
//     </SafeAreaView>

    
//   )
// }

// export default Phone2



import { View, Text, SafeAreaView, Button, TextInput, Image, ScrollView, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { useState, useRef, useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import CustomInput from '../components/CustomInput';
import { FirebaseRecaptchaVerifierModal, FirebaseAuthApplicationVerifier } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../config';
import firebase from 'firebase/compat/app';
import NumberInput from '../components/NumberInput';
import axios from 'axios';
import { AppContext } from '../../AppContext';
const Phone = () => {

  // const { phoneNumber, setPhoneNumber } = useContext(AppContext);
  const navigation = useNavigation();
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState('');
  const recaptchaVerifier = useRef(null);

  const createUser = async (phoneNumber) => {
    // create User schema using post method using axios and async , await
    try {
      const response = await axios.post('http://localhost:3000/create-user', {
        phoneNumber: phoneNumber,
      });
      console.log(response);
      console.warn('database created');
    } catch (error) {
      console.log(error);
    }
  };

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };
  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase.auth().signInWithCredential(credential)
      .then(() => {
        setCode('');
        console.log(phoneNumber);
        createUser(phoneNumber);
        // setPhoneNumber('');
        console.warn('Verified');
        // navigation.navigate("userDetails");
      })
      .catch((error) => {
        // setPhoneNumber('');
        alert(error);
        navigation.navigate("otp");
      })
  }

  return (
    <SafeAreaView className="bg-white h-screen">
      <View className="items-center  bg-white">


        <Image
          className="h-36 w-96 "

          source={require('../../assets/e-rupi.png')}></Image>
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />

        <Text className="font-bold text-xl p-3 mb-5">Phone Verification</Text>

        <View className="h-screen w-screen  bg-blue-300 rounded-t-3xl">
          <Text className="text-center mt-5  mb-1 font-semibold text-lg"> Enter your Phone Number: </Text>
          <View className="bg-white flex-row ml-12 mr-12 mt-3 mb-3 p-2 rounded-lg">

            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="+910000000000"
              keyboardType="phone-pad"
            />

          </View>
          <View className="mx-28 p-4 mb-5  mt-3 rounded-3xl"><Button className="text-black text-center" color="#82E0AA" title="Verify Phone Number" onPress={sendVerification} /></View>

          <View className="h-screen w-screen  bg-blue-300 rounded-t-3xl">
            <Text className="text-center mt-2  mb-1 font-semibold text-lg"> Enter your OTP: </Text>
            <View className="bg-white flex-row ml-12 mr-12 mt-3 mb-3 p-2 rounded-lg">
              <TextInput
                value={code}
                onChangeText={setCode}
                placeholder="OTP"
                keyboardType="phone-pad"
              />

            </View>

            <View className="mx-28 p-4 mb-10  mt-3 rounded-3xl"><Button className="text-black text-center" color="#82E0AA" title="Check OTP" onPress={confirmCode} /></View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}


export default Phone;