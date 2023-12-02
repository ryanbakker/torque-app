import { useNavigation } from "@react-navigation/native";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  useColorScheme,
} from "react-native";

export default function Home() {
  const naviation = useNavigation();
  const theme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => {
          navigate("HomeDetailsScreen");
        }}
      >
        <Pressable onPress={() => naviation.openDrawer()}>
          <Text style={{ color: "white" }}>Click</Text>
        </Pressable>
      </TouchableOpacity>

      <Text style={[{ color: theme === "dark" ? "#FFF" : "#000" }]}>
        This is a test post
      </Text>
    </SafeAreaView>
  );
}
