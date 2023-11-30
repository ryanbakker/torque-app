import { useNavigation } from "@react-navigation/native";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";

export default function Home() {
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          navigate("HomeDetailsScreen");
        }}
      >
        <Text>This is a test post</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
