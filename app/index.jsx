import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import constants from "../constants";
import "../global.css";
import CustomButton from "../components/customButton";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import "nativewind";

export default function App() {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop:-100,
          justifyContent: "center",
          alignItems: "center",
          padding: scale(1),
        }}
      >
        <Image
          source={constants.images.logo}
          style={{
            width: scale(280), // Aumentamos el tamaño
            height: verticalScale(140),
            marginBottom: verticalScale(30),
          }}
          resizeMode="contain"
        />

        <Text
          className="text-white font-bold text-center"
          style={{
            marginTop: -20,
            fontSize: moderateScale(28),
            lineHeight: moderateScale(34),
            maxWidth: scale(320),
          }}
        >
         Potenciá tu empresa con {" "}
          <Text
            className="text-secondary"
            style={{ fontSize: moderateScale(30
            ) }}
          >
            BusinessGrowth
          </Text>
        </Text>

        <Text className="tex-sm font-pregular text-gray-100 mt-7 text-center">
        Nuestro equipo está formado por expertos trabajando en conjunto para potenciar la presencia de tu negocio en el mercado.
        </Text>

        <CustomButton title=" Continuar con Email"
        handlePress={()=> {}}
        containerStyles="mt-10"/>
      </ScrollView>
    </SafeAreaView>
  );
}