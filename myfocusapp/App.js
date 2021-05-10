import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Subject as SubjectComponent } from "./src/features/subject/index";
import { Timer } from "./src/features/timer/timer";
import { FocusHistory } from "./src/components/FocusHistory";
import RoundedButton from "./src/components/RoundedButton";

const ENUM_STATUS = {
  DONE: 0,
  CANCELLED: 1,
};

export default function App() {
  const [focusSub, setFocusSub] = useState(null);

  const [focusHistoryList, setFocusHistoryList] = useState([]);

  const addSubToHistoryList = (status) => {
    setFocusHistoryList([...focusHistoryList, { subject: focusSub, status }]);
    setFocusSub(null);
  };

  const clearHistory = () => {
    setFocusHistoryList([]);
  };

  const saveHistory = async () => {
    try {
      await AsyncStorage.setItem(
        "focusHistory",
        JSON.stringify(focusHistoryList)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadHistory = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("focusHistory");
      console.log(jsonValue);
      if (jsonValue) {
        setFocusHistoryList(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    saveHistory();
  }, [focusHistoryList]);

  return (
    <View style={styles.container}>
      {focusSub ? (
        <Timer
          subject={focusSub}
          onEnd={() => {
            addSubToHistoryList(ENUM_STATUS.DONE);
          }}
          clearFocus={() => addSubToHistoryList(ENUM_STATUS.CANCELLED)}
        />
      ) : (
        <View>
          <SubjectComponent addSubject={setFocusSub} />
          <FocusHistory focusHistoryList={focusHistoryList} />

          {!!focusHistoryList.length && (
            <View style={styles.bottomContainer}>
              <RoundedButton
                title="Clear"
                size={80}
                onPress={() => {
                  clearHistory();
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252250",
  },
  bottomContainer: {
    alignItems: "center",
    marginTop: 100,
  },
});
