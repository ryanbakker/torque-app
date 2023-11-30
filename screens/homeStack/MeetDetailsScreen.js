import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function MeetDetailsScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Details",
      // headerTitle:
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <Text>Meet Details Screen</Text>
    </SafeAreaView>
  );
}
