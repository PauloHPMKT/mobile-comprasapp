import { Slot } from "expo-router";
import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
//import InLineLogo from '../../assets/images/inline-logo.svg';

const isAndroid = Platform.OS === "android";

export default function AppLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className={`bg-white flex-1 ${isAndroid ? 'mt-3': ''}`}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFF"
          translucent={false}
        />
        <View className="flex-row items-center justify-between w-full px-6">
          {/*<InLineLogo width={180} />*/}
          <View className="bg-gray-700 rounded-full w-12 h-12 flex items-center justify-center">
            <Text className="text-2xl text-white">
              H
            </Text>
          </View>
        </View>
        <View className={
          `shadow-md ${!isAndroid && 'shadow-gray-300'} bg-white rounded-lg mt-5 p-5 mx-6
          h-screen-safe overflow-y-auto`}
        >
          <Slot />
        </View>
      </SafeAreaView>

    </GestureHandlerRootView>
  );
}