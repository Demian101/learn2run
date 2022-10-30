import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useRoute, useNavigation } from "@react-navigation/native";

import Homescreen from "../screens/Homescreen";
// import Sectionscreen from "../screens/Sectionscreen";
//import VideoScreen from "../screens/Video";

const Stack = createStackNavigator();

export default function HomeStack() {
  const route = useRoute();
  const navigation = useNavigation();

  /* 会报 warning
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  */

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "modal"
      }}
    >
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen name="Sectionscreen" component={Homescreen} />
      {/* <Stack.Screen name="Video" component={VideoScreen} /> */}
    </Stack.Navigator>
  );
}