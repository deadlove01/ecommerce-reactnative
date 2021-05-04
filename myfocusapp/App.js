import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { Subject as SubjectComponent } from "./src/features/subject/index";

export default function App() {
  const [focusSub, setFocusSub] = useState(null);
  return (
    <View style={styles.container}>
      {focusSub ? (
        <Text> {focusSub}</Text>
      ) : (
        <SubjectComponent addSubject={setFocusSub} />
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
