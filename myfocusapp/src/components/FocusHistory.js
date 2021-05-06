import React from "react";
import { StyleSheet, View, Text, SafeAreaView, FlatList } from "react-native";

const renderHistoryItem = ({ item, index }) => {
  return <Text style={historyItemStyle(item.status).item}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistoryList }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        {!!focusHistoryList.length && (
          <>
            <Text style={styles.historyLabel}>Things we've focused on</Text>
            <FlatList
              keyExtractor={({ item, index }) => `row-${index}`}
              data={focusHistoryList}
              renderItem={renderHistoryItem}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const historyItemStyle = (status) =>
  StyleSheet.create({
    item: {
      color: status === 1 ? "red" : "green",
      fontSize: 20,
      paddingBottom: 10,
    },
  });

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 50,
  },
  historyLabel: {
    color: "white",
    fontSize: 30,
  },
  listContainer: {},
});
