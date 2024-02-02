import { ActivityIndicator, StatusBar } from "react-native"
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { theme } from "./src/theme";
import { Home } from "./src/screens";
import { Loading } from "./src/components/Loading";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Home/> : <Loading/>}
    </>
  );
}


