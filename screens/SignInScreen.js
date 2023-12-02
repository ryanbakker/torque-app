import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LogoIcon from "./../assets/logos/colour_icon.png";
import LogoText from "./../assets/logos/colour_text.png";
import LogoAbstract from "./../assets/images/logo_abstract.png";

export default function SignInScreen({ promptAsync }) {
  const theme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#121424" : "#EEEEEE" },
      ]}
    >
      <Image
        source={LogoAbstract}
        style={[styles.logoAbstract, { opacity: theme === "dark" ? 1 : 0.1 }]}
      />

      <View style={styles.contentContainer}>
        <View>
          <Image source={LogoIcon} style={styles.logoIcon} />
        </View>

        <View style={{ display: "flex", gap: 150 }}>
          <View>
            <Image source={LogoText} style={styles.logoText} />
            <Text
              style={[
                styles.introText,
                { color: theme === "dark" ? "#EEE" : "#121424" },
              ]}
            >
              Find, share and post car meets for easier community meet-ups.
            </Text>
            <Pressable
              onPress={() => promptAsync()}
              style={[
                styles.signInButton,
                { backgroundColor: theme === "dark" ? "#EEEEEE" : "#121424" },
              ]}
            >
              <Ionicons
                name="logo-google"
                size={22}
                color={theme === "dark" ? "black" : "white"}
              />

              <Text
                style={[
                  styles.signInButtonText,
                  { color: theme === "dark" ? "#121424" : "#EEEEEE" },
                ]}
              >
                Continue with Google
              </Text>
            </Pressable>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>Terms & Conditions</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("screen").height,
  },
  logoAbstract: {
    height: 300,
    width: 200,
    position: "absolute",
    right: 0,
    top: 40,
  },
  contentContainer: {
    marginTop: 32,
    padding: 18,
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  logoIcon: {
    height: 50,
    width: 50,
  },
  logoText: {
    height: 78,
    width: 170,
  },
  introText: {
    fontSize: 13,
    maxWidth: 280,
    paddingTop: 8,
    paddingBottom: 30,
    fontFamily: "poppins-regular",
  },
  signInButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 50,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: 500,
  },
  termsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  termsText: {
    color: "#796B9B",
    textDecorationLine: "underline",
  },
});
