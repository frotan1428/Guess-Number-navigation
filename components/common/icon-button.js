import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import React from "react";
import MCIcon from "@expo/vector-icons/MaterialCommunityIcons";

const IconButton = (props) => {
  const buttonTitle = props.title;
  const buttonIcon = props.icon || "magnify-scan";

  return (
    <TouchableHighlight style={[styles.button, props.buttonStyle]} {...props}>
      <>
        <MCIcon
          name={buttonIcon}
          style={[styles.text, styles.icon, props.textStyle]}
        />
        <Text style={[styles.text, props.textStyle]}>{buttonTitle}</Text>
      </>
    </TouchableHighlight>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  icon: {
    fontSize: 25,
    marginRight: 5,
  },
});
