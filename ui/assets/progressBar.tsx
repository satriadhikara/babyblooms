import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProgressBarProps {
  emoji: string;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ emoji, percentage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]}> 
          <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 8,
  },
  emoji: {
    fontSize: 32,
    marginRight: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 20,
    backgroundColor: "#F0ECE5",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#9C8A67",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  percentageText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProgressBar;
