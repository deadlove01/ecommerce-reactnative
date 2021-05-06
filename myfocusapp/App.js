import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Subject as SubjectComponent } from "./src/features/subject/index";
import { Timer } from "./src/features/timer/timer";
import { FocusHistory } from "./src/components/FocusHistory";

const ENUM_STATUS = {
  DONE: 0,
  CANCELLED: 1,
};

export default function App() {
  const [focusSub, setFocusSub] = useState(null);

  const [focusHistoryList, setFocusHistoryList] = useState([
    { subject: "test", status: 0 },
    { subject: "bad one", status: 1 },
  ]);

  const addSubToHistoryList = (status) => {
    setFocusHistoryList([...focusHistoryList, { subject: focusSub, status }]);
    setFocusSub(null);
  };

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
});
