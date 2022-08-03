import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../contants/colors";

const Card = (props) => {
  const { cardStyle, children } = props;

  return <View {...props} style={[styles.card, cardStyle]}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.color2,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.color3,
    borderRadius: 10,
    alignItems: "center",
  },
});
