import { View, Text , Image, StyleSheet, Button} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { AppContext } from "../../AppContext";
import { useContext } from "react";
//import { styleProps } from 'react-native-web/dist/cjs/modules/forwardedProps';


const SelectServiceProvider_comp = () => {
  const [selectedProviderIndex, setSelectedProviderIndex] = useState(-1);
  const [serviceProviders, setServiceProviders] = useState([]);
  const {serviceProviderChoice, setserviceProviderChoice} = useContext(AppContext);

  const handleProviderClick = (index,providerNumber) => {
    if (index === selectedProviderIndex) {
      // Clicked on the currently selected provider, deselect it
      setSelectedProviderIndex(-1);
    } else {
      // Clicked on a new provider, update the selected index
      setSelectedProviderIndex(index);
      setserviceProviderChoice(providerNumber);
      console.log(serviceProviderChoice);
    }
  };

  useEffect(() => {
    getAllServiceProviders();
  }, []);

  async function getAllServiceProviders() {
    try {
      const response = await axios.get('http://192.168.1.45:3000/all-service-providers');
      console.log(response.data);
      const serviceProvidersList = response.data;
      setServiceProviders(serviceProvidersList);
    } catch (error) {
      console.error(error);
      console.log(error);
      // Handle error and navigation logic
    }
  }


  return (
    
    <View className="flex-col space-y-4">
      {serviceProviders.map((provider, index) => (
        <TouchableOpacity /* className="p-2 bg-white border-2 mb-2 rounded-md h-18 mx-2" */ className="w-11/12 mx-auto" style={[styles.providerContainer, selectedProviderIndex === index && styles.selectedProviderContainer]} key={provider.serviceProviderId} onPress={() => handleProviderClick(index, provider.Users.phoneNumber)}>
         
        
            <View className="bg-blue-200 h-24 w-full rounded-md flex-row ">
              <View>
              <Image className="h-14 w-20 mt-4 ml-3" source={require('../../assets/sp.png')} />
              </View>
            <View className="flex ">
            <View className="flex-row mx-auto space-x-10">
                <Text className="font-light text-md p-1 ml-6 mt-5">{provider.BusinessName}</Text>
                <Text className="font-light text-md p-1 mt-5">{provider.Users.phoneNumber}</Text>
              </View>
              <View className="ml-6">
              <Text className="font-light text-md p-1 ">{provider.BusinessTag}</Text>
              </View>
            </View>
              
              
            </View>
           
        
        
        </TouchableOpacity>
      ))}
    </View>
    
  );
  
}



const styles = StyleSheet.create({
  providerContainer: {
    padding: 2,
    backgroundColor: 'white',
    borderWidth: 2,
    marginBottom: 5,
    marginHorizontal:7,
    borderRadius: 4,
    borderColor: '#9CD1FB',
  },
  selectedProviderContainer: {
    borderColor: 'lime',
    borderwidth: 5,
  }});

export default SelectServiceProvider_comp;