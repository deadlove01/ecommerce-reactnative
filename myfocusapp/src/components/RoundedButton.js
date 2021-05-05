import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const RoundedButton = ({
  textStyle = [],
  style = [],
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} style={[styles(size).radius, style]}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: Math.round(size / 2),
      width: size,
      height: size,
      alignItems: "center",
      justifyContent: "center",
      borderColor: "#fff",
      borderWidth: 2,
    },
    text: { color: "#fff", fontSize: Math.round(size / 3) },
  });

export default RoundedButton;
