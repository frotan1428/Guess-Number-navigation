import { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import gameInitials from "./contants/game-initials";
import GameScreen from "./screens/GameScreen";
import SummaryScreen from "./screens/SummaryScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import Toast from "react-native-toast-message";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StoreContext from "./store";
import colors from "./contants/colors";

const Stack = createNativeStackNavigator();

export default function App() {
  const [randomNumber, setRandomNumber] = useState();
  const [timer, setTimer] = useState(gameInitials.totalTime);
  const [shot, setShot] = useState(gameInitials.totalShot);
  const [gameResult, setGameResult] = useState(""); // win | lost
  const [totalPoint, setTotalPoint] = useState(0);

  const contextProps = {
    randomNumber,
    timer,
    shot,
    gameResult,
    totalPoint,
    setRandomNumber,
    setTimer,
    setShot,
    setGameResult,
    setTotalPoint,
  };

  return (
    <StoreContext.Provider value={contextProps}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: styles.header,
            headerTintColor:"white",
            headerTitleAlign:"center"
          }}
        >
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{ title: "Guess the number" }}
          />
          <Stack.Screen
            name="Summary"
            component={SummaryScreen}
            options={{ title: "Game over" }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ title: "Welcome the game" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast visibilityTime={2000} />
      <StatusBar style="auto" />
    </StoreContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: colors.color1,
    padding: 10,
    alignItems: "center",
  },
});
