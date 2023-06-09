import { View, Text, SafeAreaView, TextInput, Image, Button,ScrollView , StyleSheet,TouchableOpacity} from 'react-native';
import React from 'react';
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import Walletcard from '../components/Walletcard';


const BeneficiaryHomePage = () => {
  const navigation = useNavigation();
    const textrupi = (
    
        <Text className="text-xs"> E-RUPI</Text>
    )
    const textrupee = (
    
        <Text className="text-xs" >E-RUPEE</Text>
    )
  return (
    <SafeAreaView className="bg-white h-full">
        <View className="items-center bg-white">

        
            <Image
            className="h-36 w-52 mt-4"
            
            source = {require('../../assets/e-rupi.png')}></Image>
    
        <View >
            <View className="flex-row gap-2  mx-auto bg-gray-200 rounded-lg p-2">
                <Ionicons name="person-circle" size={36}></Ionicons>
                <Text className="p-1 font-medium text-lg">Sahil Kumar</Text>
            </View>

            <View><Text className="font-light text-center mt-5">TOTAL BALANCE</Text></View>
            <View><Text className="font-bold text-xl text-center mt-3 mb-3">1000 e$</Text></View>

            <View className="flex-row gap-6 ml-1">
            <TouchableOpacity onPress={() => {
              navigation.navigate("e_rupi_wallet");
            }}>
            <Walletcard children={textrupi}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> {
              navigation.navigate("e_rupee_wallet");
            }}>
            <Walletcard children={textrupee} />
            </TouchableOpacity>

            <View>
            <View className="">
            <View className="w-38 h-46 mx-0 mr-6 py-5 pl-5 pr-5 text-center rounded-2xl mt-5 bg-blue-200" >
              <View className="my-auto ml-4">
              <Ionicons name="documents-outline" size={56} ></Ionicons>
              </View>
              <Text className="text-xs">Digital Safe</Text>
            </View>
    </View>
            </View>
            
        </View>

        <View className="flex-row">
            <Image source={require("../../assets/amex.jpeg")} className="w-20 h-20 p-5 ml-6 mt-5"></Image>
            <View className="my-auto ml-4">
              <Ionicons name="add-circle-outline" size={26} ></Ionicons>
              </View>
        </View>

        <View>
            <Text className="font-light text-center mt-5">GOVERNMENT SCHEMES</Text>
        </View>

        <ScrollView horizontal={true} className="mt-5">
            <View className="flex-row text-center">
            <View className="bg-gray-200 ml-6 mr-2 p-2 h-24 align-middle text-center rounded-lg align-center">
              <Image source={require("../../assets/Vaccine.png")} className="w-20 h-20 "></Image>
              {/*<Ionicons name="medkit-outline" className="mx-auto"size={56}></Ionicons>*/}
              
            </View>

            <View className="bg-gray-200 ml-1 mr-2 p-4 h-24 align-middle text-center rounded-lg align-center">
              <Image source={require("../../assets/Emergency-Management.png")} className="w-16 h-16 rounded-ful "></Image>
              {/*<Ionicons name="medkit-outline" className="mx-auto"size={56}></Ionicons>*/}
              
            </View>

            <View className="bg-gray-200 ml-1 mr-2 w-30 p-5 h-24 align-middle text-center rounded-lg align-center">
              <Image source={require("../../assets/scholar.png")} className="w-14 h-14 rounded-ful "></Image>
              {/*<Ionicons name="medkit-outline" className="mx-auto"size={56}></Ionicons>*/}
              
            </View>

            <View className="bg-gray-200 ml-1 mr-2 w-30 p-5 h-24 align-middle text-center rounded-lg align-center">
              <Image source={require("../../assets/pension.png")} className="w-14 h-14 rounded-ful "></Image>
              {/*<Ionicons name="medkit-outline" className="mx-auto"size={56}></Ionicons>*/}
              
            </View>
            <View className="bg-gray-200 ml-1 mr-6 w-30 p-5 h-24 align-middle text-center rounded-lg align-center">
              <Image source={require("../../assets/food.jpeg")} className="w-14 h-14 rounded-ful "></Image>
              {/*<Ionicons name="medkit-outline" className="mx-auto"size={56}></Ionicons>*/}
              
            </View>

            </View>

        </ScrollView>
            
               
           
        </View>

        
    </View>

    <View className="bg-gray-300 h-36 mt-20 rounded-lg">
        <View className="flex-row gap-10 mx-auto text-center p-1 ml-0" >
          <View className="text-center items-center"><Ionicons name="home-outline" size={20}></Ionicons><Text className="text-xs">Dashboard</Text></View>
          <View className="text-center items-center"><Ionicons name="build-outline" size={20}></Ionicons><Text className="text-xs">Select Role</Text></View>
          <View className="text-center items-center"><Ionicons name="wallet-outline" size={20}></Ionicons><Text className="text-xs">Wallets</Text></View>
          <View className="text-center items-center"><Ionicons name="person-outline" size={20}></Ionicons><Text className="text-xs">Profile</Text></View>
        </View>
        
      </View>
    </SafeAreaView>
  )
          }



export default BeneficiaryHomePage;
