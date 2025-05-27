import { View, Text, TextInput, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import * as SecureStore from "expo-secure-store"

const Setup = ({ setApiKey } : SetUpProps) => {
    const [key, setKey] = useState<string | undefined>(""); 
    const handleClick = async () => {
        if (key) {
            setApiKey(key);
            await SecureStore.setItemAsync("apiKey", key);
        } else {
            Alert.alert("Please enter a valid key");
        }
    }
  return (
    <View className='w-full h-[15vh] border-2 border-green-400 rounded-md items-center justify-center p-2 bg-neutral-700'>
      <TextInput
        value={key}
        onChangeText={(text) => setKey(text)}
        className='bg-gray-400 w-full rounded-md p-2 text-white font-bold m-1'
      />
      <View className='flex-row justify-stretch items-center m-1'>
        <TouchableOpacity onPress={handleClick} className='bg-green-400 p-2 rounded-md m-1'>
            <Text>Configure Api Key</Text>
        </TouchableOpacity>
        <Text className='text-white'>
            Don&apos;t have one? {" "}
        </Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://ai.google.dev/gemini-api/docs/api-key")}>
            <View className='items-center'>
                <Text className='text-blue-500'>
                    Click here!
                </Text>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Setup