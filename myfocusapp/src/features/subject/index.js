import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import RoundedButton from "../../components/RoundedButton";

export const Subject = ({ addSubject }) => {
  const [tempSub, setTempSub] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainner}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputContainerTextInput}
            value={tempSub}
            onChangeText={(text) => {
              setTempSub(text);
            }}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              addSubject(tempSub);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainner: {
    flex: 0.5,
    padding: 15,
    justifyContent: "center",
  },
  inputContainer: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainerTextInput: { flex: 1, marginRight: 15 },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
});
