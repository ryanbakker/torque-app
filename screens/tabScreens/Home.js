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
} from "react-native";
import { auth } from "../../firebaseConfig";
import Colors from "../../Shared/Colors";
import Logo from "./../../assets/logos/colour_full.png";
import Greeting from "../../components/Home/Greeting";

export default function Home() {
  const naviation = useNavigation();
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
        <TouchableOpacity
          onPress={() => {
            navigate("HomeDetailsScreen");
          }}
        >
          <Pressable
            onPress={() => naviation.openDrawer()}
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
        </TouchableOpacity>

        <View style={{ marginLeft: "auto" }}>
          <Image source={Logo} style={styles.mainLogo} />
        </View>
      </View>

      <Greeting userName={userName} />

      <View style={styles.containerBody}>
        <Text style={[{ color: theme === "dark" ? "#FFF" : "#000" }]}>
          This is the body
        </Text>
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
