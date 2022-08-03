import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/common/header";
import IconButton from "../components/common/icon-button";
import Spacer from "../components/common/spacer";
import gameInitials from "../contants/game-initials";
import colors from "../contants/colors";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the game</Text>
        <Spacer />
        <Text style={styles.desc}>
          Guess the number between {gameInitials.randomNumberDownLimit} to{" "}
          {gameInitials.randomNumberUpLimit} in {gameInitials.totalTime}{" "}
          seconds. You have {gameInitials.totalShot} shots.
        </Text>
        <Spacer />
        <IconButton
          title="Start The Game"
          icon="gamepad-variant-outline"
          onPress={() => navigation.navigate("Game")}
        />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
  },
  desc: {
    fontSize: 18,
    fontStyle: "italic",
    color: colors.color3,
    textAlign: "center",
  },
});
