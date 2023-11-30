import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Text, SafeAreaView, TouchableOpacity, Pressable } from "react-native";

export default function Home() {
  const naviation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          navigate("HomeDetailsScreen");
        }}
      >
        <Text>This is a test post</Text>

        <Pressable onPress={() => naviation.openDrawer()}>
          <Text>Click</Text>
        </Pressable>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
