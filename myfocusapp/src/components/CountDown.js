import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

export const CountDown = ({ minutes = 1, isPaused, setProgress, onEnd }) => {
  const minuteToMilis = (min) => min * 1000 * 60;
  const [milis, setMilis] = useState(minuteToMilis(minutes));
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  const [totalTime, setTotalTime] = useState(milis);

  const intervalHandler = useRef(null);

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) {
        clearInterval(intervalHandler.current);
        setProgress(1);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      let percentage = (totalTime - timeLeft) / totalTime;
      // if (percentage > 1) {
      //   percentage = 1;
      // }

      setProgress(percentage);
      return timeLeft;
    });
  };

  const initData = () => {
    const time = minuteToMilis(minutes);
    setMilis(time);
    setTotalTime(time);
    if (intervalHandler.current) {
      clearInterval(intervalHandler.current);
    }
  };

  useEffect(() => {
    initData(minutes);
    return () => {};
  }, [minutes]);

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
