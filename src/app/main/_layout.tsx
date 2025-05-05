import { RootState } from "@/src/store";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const isAndroid = Platform.OS === "android";

export default function AppLayout() {
  const user = useSelector((state: RootState) => state.auth);

  const [firstLetterUsername, setFirstLetterUsername] = useState<string | null>(null);

  useEffect(() => {
    console.log(user, 'USER');
    if (user?.name) {
      const firstLetter = user.name.charAt(0).toUpperCase();
      setFirstLetterUsername(firstLetter);
    }
  }, [user]);

  return (
      <SafeAreaView className={`flex-1 ${isAndroid ? 'mt-3': ''}`}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFF"
          translucent={false}
        />
        <View className="flex-1 items-center justify-between w-full px-6">
          <View className="flex-row w-full my-3 items-center justify-between">
            <Image
              source={require('../../assets/images/Logo-horizontal.png')}
              className="w-48"
              resizeMode="contain"
            />
            <View className="bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center">
              <Text className="text-2xl text-white">
                {firstLetterUsername}
              </Text>
            </View>
          </View>
          <View className={
            `shadow-md ${!isAndroid ? 'shadow-gray-100' : 'shadow-slate-500' } w-full bg-white rounded-lg mt-2 p-5 mx-6
            h-screen-safe overflow-y-auto`}
          >
            <GestureHandlerRootView className="flex-1">
              <Slot />
            </GestureHandlerRootView>
          </View>
        </View>
      </SafeAreaView>
  )
}