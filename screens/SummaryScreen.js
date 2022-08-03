import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Header from "../components/common/header";
import IconButton from "../components/common/icon-button";
import Spacer from "../components/common/spacer";
import Card from "../components/common/card";
import gameInitials from "../contants/game-initials";
import StoreContext from "../store";
import { useNavigation } from "@react-navigation/native";

const SummaryScreen = () => {
  const context = useContext(StoreContext);
  const navigation = useNavigation();

  const { gameResult, totalPoint, randomNumber, timer, shot, setTimer } = context;
  
  const restartGame = () => { 
    setTimer(gameInitials.totalTime);
    navigation.navigate("Game");
   }
  
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.resultText}>
          {gameResult === "win"
            ? "🏆🏆🏆 YOU WIN 🏆🏆🏆"
            : "👎👎👎 YOU LOST 👎👎👎"}
        </Text>

        <Spacer />

        <Card cardStyle={styles.card}>
          <Text style={styles.totalPoint}>{totalPoint}</Text>
          <Text>Point</Text>
        </Card>

        <Spacer />

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Sumarry</Text>
          <Text>The number was: {randomNumber}</Text>
          <Text>Total time: {timer} </Text>
          <Text>Total shot: {shot} </Text>
        </View>

        <Spacer />

        <IconButton
          title="Re Start The Game"
          icon="gamepad-variant-outline"
          onPress={restartGame}
        />
      </View>
    </View>
  );
};

export default SummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText:{
    fontSize:20
  },
  card:{
    width:"60%",
    elevation:10,
    shadowColor: "black",
    shadowOpacity:0.5
  },
  totalPoint:{
    fontSize:40,
    fontWeight:"bold"
  },
  summary:{
    alignItems:"center"
  },
  summaryTitle:{
    fontWeight:"bold"
  }
});
