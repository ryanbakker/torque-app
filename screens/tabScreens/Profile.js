import { signOut } from "firebase/auth";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default function Profile() {
  const theme = useColorScheme();
  const currentUser = { auth };

  console.log("Current User => ", currentUser);

  return (
    <SafeAreaView
      style={[
        styles.profileContainer,
        { backgroundColor: theme === "dark" ? "#121424" : "#EEEEEE" },
      ]}
    >
      <Text>User Profile</Text>

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

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
});
