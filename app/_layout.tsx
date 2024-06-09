import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
import  store  from '@/redux/store';
import registerNNPushToken from 'native-notify';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  registerNNPushToken(21716, 'DIMDUh0JzggmHGFrXumQe1');
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="(tabs)"/>
        <Stack.Screen name="(auth)"/>
        <Stack.Screen name="address"/>
        <Stack.Screen name="category"/>
        <Stack.Screen name="productdetails"/>
        <Stack.Screen name="cart"/>
        <Stack.Screen name="confirmorder"/>
        <Stack.Screen name="orders"/>
        <Stack.Screen name="favorities"/>
      </Stack>
      </Provider>
    </ThemeProvider>
  );
}
