import { useContext, useEffect, useState } from "react";
import { UserLocationContext } from "../../context/UserLocationContext";
import { Dimensions, Text, View, useColorScheme } from "react-native";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { darkMapStyle, lightMapStyle } from "../../Shared/MapStyle";
import { Marker } from "react-native-maps";

export default function MapViewFull() {
  const [mapRegion, setMapRegion] = useState();
  const { location, setLocation } = useContext(UserLocationContext);
  const theme = useColorScheme();

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [location]);

  return (
    <View style={{ position: "relative" }}>
      <MapView
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height * 0.91,
          zIndex: 1,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={mapRegion}
        customMapStyle={theme === "dark" ? darkMapStyle : lightMapStyle}
      ></MapView>
    </View>
  );
}
