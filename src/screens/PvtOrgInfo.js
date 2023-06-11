import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    Button,
    Image,
    ScrollView,
  } from "react-native";
  import React from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
  import { useState } from "react";
  import Number_input_ud from "../components/Number_input_ud"
  import {useForm,Controller} from "react-hook-form";
 
  
  
  const PvtOrgInfo = () => {
    const navigation = useNavigation();
    const {control, handleSubmit} = useForm();
    //[CompanyName, setCompanyName] = useState("");
    //[positionInCompany, setPositionInCompany] = useState("");


    const updatePvtOrg = async (
        data
      /* phoneNumber,
      CompanyName,
      positionInCompany */
    ) => {
        console.log(data);
      // create User schema using post method using axios and async , await
      /* try {
        const response = await axios.patch("http://localhost:3000/create-pvtOrg", {
          phoneNumber: phoneNumber,  
          CompanyName: CompanyName,
          positionInCompany: positionInCompany,
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      } */
    };
  
    return (
      <SafeAreaView className="bg-white h-full">
        <View className="items-center  bg-white">
          <Image
            className="h-36 w-96 mt-5"
            source={require("../../assets/e-rupi.png")}
          ></Image>
  
          <Text className="font-bold text-xl p-3 mb-5">Private Organization Details</Text>
  
          <View className="h-full w-full bg-blue-300 rounded-t-3xl">
            <Text className="text-center mt-12  mb-1 font-semibold text-lg">
              {" "}
              Enter following details:{" "}
            </Text>


            <View className="flex-col gap-5 mt-3">
              <View className="flex-row gap-4">
                <View className="pl-12">
                <Ionicons
                  name="briefcase-outline"
                  color="white"
                  className="top-6"
                  size={40}
                ></Ionicons>
                </View>
                <View className="ml-2">
                <Number_input_ud
                 name="CompanyName"
                 control={control}
                 //value={CompanyName}
                 //onChangeText={setCompanyName}
                 secureTextEntry={false}
                 placeholder="Enter your Company Name"
                 keyboardType="default"
                 />
              </View>
              </View>


              <View className="flex-row gap-4">
                <View className="pl-12">
                <Ionicons
                  name="person-circle-outline"
                  color="white"
                  className="top-6"
                  size={40}
                ></Ionicons>
                </View>
                <View className="ml-2">
                <Number_input_ud
                 name="Position in Company"
                 control={control}
                 //value= {positionInCompany}
                 //onChangeText={setPositionInCompany}
                 secureTextEntry={false}
                 placeholder="Enter your Position in Company"
                 keyboardType="default"
                 />
              </View>
              </View>
    
  
            </View>
  
            <View className="mx-28 p-4 mt-9 mb-10 rounded-2xl">
              <Button
                color="#82E0AA"
                onPress={() => {
                    handleSubmit(updatePvtOrg)
                }}/* {updatePvtOrg(phoneNumber, CompanyName, positionInCompany).then(() => {
                  navigation.navigate("pvtOrgHomePage");
                })} */
                title="Next"
              ></Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default PvtOrgInfo;
  