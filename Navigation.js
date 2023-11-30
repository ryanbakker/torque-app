import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/tabScreens/Home";
import Explore from "./screens/tabScreens/Explore";
import CreateMeet from "./screens/tabScreens/CreateMeet";
import Saved from "./screens/tabScreens/Saved";
import HomeDetailsScreen from "./screens/homeStack/MeetDetailsScreen";
import Notifications from "./screens/tabScreens/Notifications";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Settings from "./screens/drawerScreens/Settings";
import { Pressable, Text, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";

// Stack
const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="TabGroup" component={TabGroup} />
      <HomeStack.Screen
        name="HomeDetailsScreen"
        component={HomeDetailsScreen}
        options={{ presentation: "modal" }}
      />
    </HomeStack.Navigator>
  );
}

// Bottom Tab
const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "ios-search-sharp" : "ios-search-sharp";
          } else if (route.name === "CreateMeet") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Notifications") {
            iconName = focused
              ? "ios-notifications"
              : "ios-notifications-outline";
          } else if (route.name === "Saved") {
            iconName = focused ? "ios-heart" : "ios-heart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#5D3FD3",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: false,
        }}
      />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="CreateMeet" component={CreateMeet} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Saved" component={Saved} />
    </Tab.Navigator>
  );
}

// Drawer
const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeStackGroup" component={HomeStackGroup} />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigation() {
  const currentTheme = useColorScheme();

  return (
    <NavigationContainer
      theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar style="auto" />
      <DrawerGroup />
    </NavigationContainer>
  );
}
