import "react-native-gesture-handler";
import AppNavigation from "./Navigation";
import SignInScreen from "./screens/SignInScreen";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { useFonts } from "expo-font";
import { auth } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

function App() {
  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId:
      "351964922129-aaj7t8allpeonrv3u5copigra17s8bvo.apps.googleusercontent.com",
    androidClientId:
      "351964922129-cc2cjhidif7tqmle25kei6ok8nutjodi.apps.googleusercontent.com",
  });
  const [fontsLoaded] = useFonts({
    "poppins-regular": require("./assets/fonts/poppins/Poppins-Regular.ttf"),
  });

  const checkLocalUser = async () => {
    try {
      setLoading(true);
      const userJSON = await AsyncStorage.getItem("@user");
      const userData = userJSON ? JSON.parse(userJSON) : null;

      setUserInfo(userData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential);
    }
  }, [response]);

  React.useEffect(() => {
    checkLocalUser();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
      } else {
        console.log("User not authenticated");
      }
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return userInfo ? (
    <AppNavigation />
  ) : (
    <SignInScreen promptAsync={promptAsync} />
  );
}

export default App;
