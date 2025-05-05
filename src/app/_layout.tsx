import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '../store';
import '../styles/global.css';

export default function RootLayout() {
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      console.log('Verifying authentication...', checkedAuth);
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        return router.replace('../auth/login');
      } else {
        router.replace('../main/dashboard');
      }

      setCheckedAuth(true);
    };

    verifyAuth();
  }, [checkedAuth, router]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Slot />
      </PersistGate>
    </Provider>
  );
}
