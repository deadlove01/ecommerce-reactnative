import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

export const CountDown = ({ minutes = 1, isPaused, setProgress }) => {
  const minuteToMilis = (min) => min * 1000 * 60;
  const [milis, setMilis] = useState(minuteToMilis(minutes));
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  const intervalHandler = useRef(null);

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) return time;
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      if (intervalHandler.current) {
        clearInterval(intervalHandler.current);
      }
      return;
    }
    intervalHandler.current = setInterval(countDown, 1000);

    return () => {
      clearInterval(intervalHandler.current);
    };
  }, [isPaused]);

  const mm = Math.floor(milis / 1000 / 60) % 60;
  const ss = Math.floor(milis / 1000) % 60;
  return (
    <View style={styles.countDownContainer}>
      <Text style={styles.countDownText}>
        {formatTime(mm)}:{formatTime(ss)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  countDownContainer: {
    backgroundColor: "#3858ea",
  },
  countDownText: {
    fontWeight: "bold",
    fontSize: 100,
    color: "#fff",
    padding: 20,
  },
});
