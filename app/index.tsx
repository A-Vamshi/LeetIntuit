import Main from "@/components/Main";
import Setup from "@/components/Setup";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [apiKey, setApiKey] = useState<string | undefined>();
  useEffect(() => {
    const getKey = async () => {
      const key = await SecureStore.getItemAsync("apiKey")
      if (key) {
        setApiKey(key);
      }
    }
    getKey();
  }, [])
  return (
    <SafeAreaView className="bg-neutral-800 h-full">
      <ScrollView className="m-2">
          {apiKey ? (
              <View>
                <Text className="text-green-400 font-bold text-center">You API Key is Configured!</Text>
                <Main apiKey={apiKey ? apiKey : ""} />
              </View>
            ) : (
              <Setup setApiKey={setApiKey} />
            )
          }
        </ScrollView>
    </SafeAreaView>
  );
}

export default Index;