import { signOut } from "firebase/auth";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import { db, auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/auth";
import "firebase/firestore";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const [user, setUser] = useState("");
  const [signedInUser, setSignedInUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setSignedInUser(user);
      } else {
        setSignedInUser(null);
      }
    });
  }, []);

  console.log("Signed In User => ", signedInUser);

  // const [user, setUser]
  const theme = useColorScheme();

  useEffect(() => {
    const userRef = doc(db, "users", "ThsGIl9lE3P4sysuehx8");

    getDoc(userRef).then((docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("No such document!");
      }
    });

    console.log("User => ", user);
  }, []);

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

      <Text style={[{ color: theme === "dark" ? "#FFF" : "#000" }]}>
        User Info
      </Text>
      <Text style={[{ color: theme === "dark" ? "#FFF" : "#000" }]}>
        {user.displayName}
      </Text>
      <Text style={[{ color: theme === "dark" ? "#FFF" : "#000" }]}>
        {user.email}
      </Text>
      <Text style={[{ color: theme === "dark" ? "#FFF" : "#000" }]}>
        {user.userId}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },
});
