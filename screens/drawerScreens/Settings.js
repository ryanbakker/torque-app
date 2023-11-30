import { useNavigation } from "@react-navigation/native";
import { Button, SafeAreaView, Text } from "react-native";

export default function Settings() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>User Settings</Text>
    </SafeAreaView>
  );
}
