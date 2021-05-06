import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { ProgressBar } from "react-native-paper";
import { CountDown } from "../../components/CountDown";
import RoundedButton from "../../components/RoundedButton";

const width = Dimensions.get("window").width;

export const Timer = ({ subject, onEnd, clearFocus }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const minutesArr = [0.1, 5, 10];
  const [selectedMinutes, setSelectedMinutes] = useState(minutesArr[1]);

  const onChangeDuration = (min) => {
    setSelectedMinutes(min);
    setIsStarted(false);
    setProgress(0);
  };

  return (
    <View style={styles.container}>
      <CountDown
        setProgress={setProgress}
        isPaused={!isStarted}
        minutes={selectedMinutes}
        onEnd={onEnd}
      />
      <View style={styles.focusContainer}>
        <Text style={styles.focusLabel}>Focusing on: </Text>
        <Text style={styles.focusSubject}>{subject}</Text>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />

        <View style={styles.groupButtonContainer}>
          {minutesArr &&
            minutesArr.map((item, index) => {
              return (
                <RoundedButton
                  key={`btn-${index}`}
                  title={item}
                  size={80}
                  onPress={() => onChangeDuration(item)}
                />
              );
            })}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <RoundedButton
          style={{ alignSelf: "center" }}
          title={isStarted ? "Stop" : "Start"}
          textStyle={styles.buttonText}
          size={120}
          onPress={() => {
            setIsStarted(!isStarted);
          }}
        />

        <RoundedButton
          style={styles.clearButton}
          title="-"
          textStyle={styles.buttonText}
          size={40}
          onPress={() => {
            clearFocus();
          }}
        />
      </View>
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
  groupButtonContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 40,
  },
  clearButton: {
    marginLeft: 35,
  },
  bottomContainer: {
    width: width,
    justifyContent: "center",
  },
});
