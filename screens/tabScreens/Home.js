import { useNavigation } from "@react-navigation/native";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  useColorScheme,
  StyleSheet,
  Image,
  View,
  Button,
} from "react-native";
import { auth } from "../../firebaseConfig";
import Colors from "../../Shared/Colors";
import Logo from "./../../assets/logos/colour_full.png";
import Greeting from "../../components/Home/Greeting";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";

export default function Home() {
  const navigation = useNavigation();
  const theme = useColorScheme();
  const user = auth;
  const userImage = user.currentUser?.photoURL;
  const userName = user.currentUser?.displayName;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#121424" : "#EEEEEE" },
      ]}
    >
      <View
        style={[
          {
            display: "flex",
            flexDirection: "row",
            padding: 12,
            paddingTop: 50,
            alignItems: "center",
          },
          // { backgroundColor: theme === "dark" ? "#121424" : "white" },
        ]}
      >
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.userButton}
        >
          <Image
            source={{ uri: userImage }}
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
            }}
          />
        </Pressable>

        <View style={{ marginLeft: "auto" }}>
          <Image source={Logo} style={styles.mainLogo} />
        </View>
      </View>

      <Greeting userName={userName} />

      <View style={styles.containerBody}>
        <Text style={[{ color: theme === "dark" ? "#FFF" : "#000" }]}>
          This is the body
        </Text>
        <Button
          title="Sign Out"
          onPress={async () => {
            await signOut(auth);
            await AsyncStorage.removeItem("@user");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userButton: {
    border: 1,
    borderColor: Colors.purple,
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: 50,
    height: 50,
    padding: 3,
    borderRadius: 100,
  },
  mainLogo: {
    height: 52,
    width: 150,
  },
  containerBody: {
    padding: 12,
  },
});
