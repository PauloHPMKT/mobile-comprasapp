import { AuthProvider } from '@/src/contexts/auth/AuthProvider';
import { Slot, useRouter, useSegments } from 'expo-router';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const isAndroid = Platform.OS === "android";

export default function AuthLayout() {
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1];
  const isLogin = currentRoute === 'login';

  const router = useRouter();

  return (
    <SafeAreaView className={`flex-1 ${isAndroid ? 'mt-3': ''}`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              paddingHorizontal: 24,
              paddingBottom: 32,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="items-center mb-6">
              <Image
                source={require('../../assets/images/Logo-vertical.png')}
                className="w-40"
                resizeMode="contain"
              />
            </View>

            <View className="items-center mb-8">
              <Text className="text-gray-800 text-[22px] font-bold">
                {isLogin ? "Bem-vindo de volta!" : "Crie sua conta!"}
              </Text>
              <Text className="text-gray-300 text-center w-[80%]">
                {isLogin
                  ? "Acesse sua conta para continuar"
                  : "e organize suas compras de forma prática e inteligente."}
              </Text>
            </View>

            <AuthProvider>
              <Slot />
            </AuthProvider>

            <View className="mt-8 items-center">
              <TouchableOpacity
                onPress={() => {
                  router.replace(isLogin ? './register' : './login');
                }}
              >
                <Text className="text-red-700 underline">
                  {isLogin
                    ? "Não tem conta? Cadastre-se"
                    : "Já tem conta? Faça login"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
