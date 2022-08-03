import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Header from "../components/common/header";
import ScoreBoard from "../components/game-screen/scoreboard";
import Spacer from "../components/common/spacer";
import Card from "../components/common/card";
import IconButton from "../components/common/icon-button";
import colors from "../contants/colors";
import gameInitials from "../contants/game-initials";
import Toast from "react-native-toast-message";
import StoreContext from "../store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const GameScreen = () => {
  const contex = useContext(StoreContext);
  const navigation = useNavigation();

  const {
    randomNumber,
    setRandomNumber,
    setTimer,
    timer,
    shot,
    setShot,
    setGameResult,
    setTotalPoint,
  } = contex;

  const inputRef = useRef(null);

  const [number, setNumber] = useState("");

  useFocusEffect(
    useCallback(() => {
      // Can sayısını resetle
      setShot(gameInitials.totalShot);

      // Puan resetlenir
      setTotalPoint(0);

      // Oyun sonucu resetle
      setGameResult("");

      // Rasgele sayı tut
      const rn = Math.floor(
        Math.random() *
          (gameInitials.randomNumberUpLimit -
            gameInitials.randomNumberDownLimit) +
          gameInitials.randomNumberDownLimit
      );
      setRandomNumber(rn);

      // Timer reset
      setTimer(gameInitials.totalTime);

      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      //setFocus();

      return () => {
        clearInterval(interval);
      };
    }, [])
  );



  useEffect(() => {
    if (timer <= 0) {
      endGame("lost");
    }
  }, [timer]);

  const endGame = (result) => {
    setGameResult(result);
    setTotalPoint(timer * shot * 10);
    navigation.navigate("Summary");
  };

  const handleGuess = () => {
    const enteredNumber = Number(number);

    // Girilen değer rakam mı, belirtilen sınırlar içinde mi kontrolü yapılıyor
    if (
      isNaN(enteredNumber) ||
      enteredNumber < gameInitials.randomNumberDownLimit ||
      enteredNumber > gameInitials.randomNumberUpLimit
    ) {
      Toast.show({
        type: "error",
        text1: `You have to type number between ${gameInitials.randomNumberDownLimit} and ${gameInitials.randomNumberUpLimit}`,
      });
      return;
    }

    if (randomNumber === enteredNumber) {
      endGame("win");
    } else if (randomNumber > enteredNumber) {
      Toast.show({
        type: "info",
        text1: `It must be greater then ${enteredNumber}`,
      });
      handleShot();
    } else {
      Toast.show({
        type: "info",
        text1: `It must be less then ${enteredNumber}`,
      });
      handleShot();
    }

    setNumber("");
  };

  const handleShot = () => {
    if (shot > 0) {
      setShot((prev) => prev - 1);
    } else {
      endGame("lost");
    }
  };

  const setFocus = () => {
    inputRef.current.focus();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ScoreBoard timer={timer} shot={shot} />
          <Spacer />

          <TouchableWithoutFeedback onPress={setFocus}>
            <Card>
              <Text style={styles.text}>Type a number</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                maxLength={gameInitials.randomNumberUpLimit.toString().length}
                value={number}
                onChangeText={(text) => setNumber(text)}
                onSubmitEditing={handleGuess}
                ref={inputRef}
              />
              <IconButton title="GUESS" icon="target" onPress={handleGuess} />
            </Card>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  text: {
    fontSize: 15,
    color: colors.color3,
  },
  input: {
    padding: 5,
    borderBottomColor: colors.color3,
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 25,
  },
});
