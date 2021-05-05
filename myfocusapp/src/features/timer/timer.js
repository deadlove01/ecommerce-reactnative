import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { ProgressBar } from "react-native-paper";
import { CountDown } from "../../components/CountDown";
import RoundedButton from "../../components/RoundedButton";

const width = Dimensions.get("window").width;

export const Timer = ({ subject }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  return (
    <View style={styles.container}>
      <CountDown setProgress={setProgress} isPaused={!isStarted} minutes={20} />
      <View style={styles.focusContainer}>
        <Text style={styles.focusLabel}>Focusing on: </Text>
        <Text style={styles.focusSubject}>{subject}</Text>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>

      <RoundedButton
        title={isStarted ? "Stop" : "Start"}
        textStyle={styles.buttonText}
        size={120}
        onPress={() => {
          setIsStarted(!isStarted);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonText: {
    fontSize: 30,
  },
  countDownContainer: {
    backgroundColor: "#3858ea",
  },
  countDownText: {
    fontWeight: "bold",
    fontSize: 100,
    color: "#fff",
    padding: 20,
  },
  focusContainer: {
    width: width,
  },
  focusLabel: {
    color: "#fff",
    alignSelf: "center",
  },
  focusSubject: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 40,
    alignSelf: "center",
    marginBottom: 10,
  },
});
