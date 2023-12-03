import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";

export default function Greeting({ userName }) {
  const theme = useColorScheme();
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const firstName = userName?.split(" ")[0];

  return (
    <View style={styles.container}>
      <Text
        style={[styles.greeting, { color: theme === "dark" ? "#FFF" : "#000" }]}
      >
        {greeting}, {firstName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  greeting: {
    fontFamily: "familjen-medium",
    fontSize: 17,
  },
});
