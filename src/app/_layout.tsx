import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import '../styles/global.css';

export default function RootLayout() {
  const router = useRouter();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      console.log('Verifying authentication...', checkedAuth);
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        router.replace('../main/dashboard');
      } else {
        router.replace('./auth/login');
      }

      setCheckedAuth(true);
    };

    verifyAuth();
  }, [checkedAuth, router]);

  return <Slot />;
}
