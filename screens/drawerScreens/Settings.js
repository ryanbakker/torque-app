import { signOut } from "firebase/auth";
import { Button, SafeAreaView, Text } from "react-native";
import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Text>User Settings</Text>
      <Button
        title="Sign Out"
        onPress={async () => {
          await signOut(auth);
          await AsyncStorage.removeItem("@user");
        }}
      />
    </SafeAreaView>
  );
}
