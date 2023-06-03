import { View, Text, SafeAreaView, Image, TextInput, Button } from 'react-native'
import React from 'react'

const SelectRole = () => {
  return (
    <SafeAreaView className="bg-white h-full">
    <View className="items-center  bg-white">

    
    <Image
    className="h-36 w-96 "
    
    source = {require('../assets/e-rupi.png')}></Image>
    
    <Text className="font-bold text-xl p-3 mb-5">Select Role</Text>

    <View className = "h-full w-full bg-blue-300 rounded-t-3xl">

      <View className="mx-10 p-4 mt-16 mb-5 rounded-2xl"><Button color="#236DE7" className="p-4" title="Beneficiary"></Button></View>
      <View className="mx-10 p-4 mt-9 mb-5 rounded-2xl"><Button color="#236DE7" className="p-4" title="Service Provider"></Button></View>
      <View className="mx-10 p-4 mt-9 mb-10 rounded-2xl"><Button color="#236DE7" className="p-4" title="Private Organization"></Button></View>   

    </View>
    
</View>
</SafeAreaView>
  )
}

export default SelectRole