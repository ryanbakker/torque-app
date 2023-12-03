import "react-native-gesture-handler";
import AppNavigation from "./Navigation";
import SignInScreen from "./screens/SignInScreen";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import * as Location from "expo-location";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { useFonts } from "expo-font";
import { auth, db, usersRef } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { UserLocationContext } from "./context/UserLocationContext";
import { addDoc, query, where, getDocs, collection } from "firebase/firestore";

WebBrowser.maybeCompleteAuthSession();

function App() {
  const [userInfo, setUserInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId:
      "351964922129-aaj7t8allpeonrv3u5copigra17s8bvo.apps.googleusercontent.com",
    androidClientId:
      "351964922129-cc2cjhidif7tqmle25kei6ok8nutjodi.apps.googleusercontent.com",
  });
  const [fontsLoaded] = useFonts({
    "poppins-light": require("./assets/fonts/poppins/Poppins-Light.ttf"),
    "poppins-regular": require("./assets/fonts/poppins/Poppins-Regular.ttf"),
    "poppins-medium": require("./assets/fonts/poppins/Poppins-Medium.ttf"),
    "poppins-semibold": require("./assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "familjen-regular": require("./assets/fonts/familjen/FamiljenGrotesk-Regular.ttf"),
    "familjen-medium": require("./assets/fonts/familjen/FamiljenGrotesk-Medium.ttf"),
    "familjen-semibold": require("./assets/fonts/familjen/FamiljenGrotesk-SemiBold.ttf"),
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

        // Check if the user already exists in Firestore
        const q = query(usersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size === 0) {
          // User does not exist, add them to Firestore
          await addDoc(usersRef, {
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
            userId: user.uid,
            coverPhoto: "",
            bio: "",
          });

          console.log("New User => ", user.displayName, user.uid);
        } else {
          console.log("User already exists:", user.displayName, user.uid);
        }
      } else {
        console.log("User not authenticated");
      }
    });

    return () => unsub();
  }, []);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return userInfo ? (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <AppNavigation />
    </UserLocationContext.Provider>
  ) : (
    <SignInScreen promptAsync={promptAsync} />
  );
}

export default App;
