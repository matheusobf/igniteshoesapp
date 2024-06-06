import { StatusBar, Platform } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect } from 'react';

const oneSignalAppid = Platform.OS === "ios" ?
  "d88d7350-60a0-4440-8878-c07b55e22b43" : // IOS
  "d88d7350-60a0-4440-8878-c07b55e22b43";

OneSignal.initialize(oneSignalAppid)
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  tagUserInfoCreate()
  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result
      switch(actionId) {
        case "1":
          console.log("Ver todos")
          break
        case "2":
          console.log("Ver pedido")
          break
        default:
          console.log("Nenhuma botão de ação selecionado.")
          break
      }
    }
    OneSignal.Notifications.addEventListener("click", handleNotificationClick)
    return () => OneSignal.Notifications.removeEventListener("click", handleNotificationClick)
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}