import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import constants from "../constants";
import "../global.css";
import { Redirect, router } from "expo-router";
import CustomButton from "../components/customButton";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import "nativewind";
import { useWindowDimensions } from "react-native";

export default function App() {
  const { height } = useWindowDimensions();
  const isLargeScreen = height > 800; // Ajustá según tu necesidad

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: scale(1),
          paddingBottom: verticalScale(isLargeScreen ? 40 : 20),
          paddingTop: verticalScale(isLargeScreen ? 40 : 10),
        }}
      >
        <View className="w-full justify-center items-center px-4">
          <Image
            source={constants.images.logo}
            style={{
              width: scale(280),
              height: verticalScale(140),
              marginBottom: verticalScale(isLargeScreen ? 40 : 20),
            }}
            resizeMode="contain"
          />

          <Text
            className="text-white font-bold text-center"
            style={{
              fontSize: moderateScale(28),
              lineHeight: moderateScale(34),
              maxWidth: scale(320),
              marginTop: verticalScale(isLargeScreen ? 10 : 0),
            }}
          >
            Potenciá tu empresa con{" "}
            <Text
              className="text-secondary"
              style={{ fontSize: moderateScale(30) }}
            >
              BusinessGrowth
            </Text>
          </Text>

          <Text
            className="text-sm font-pregular text-gray-100 text-center"
            style={{
              marginTop: verticalScale(20),
              marginBottom: verticalScale(10),
              paddingHorizontal: scale(10),
            }}
          >
            Nuestro equipo está formado por expertos trabajando en conjunto
            para potenciar la presencia de tu negocio en el mercado.
          </Text>

          <CustomButton
            title="Continuar con Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="mt-10"
          />
        </View>
      </ScrollView>

      <StatusBar background="#161622" style="light" />
    </SafeAreaView>
  );
}