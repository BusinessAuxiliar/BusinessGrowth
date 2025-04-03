import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import "../../BusinessGrowth/global.css";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg_white">
      <Text className="text-3xl font-pblack"> Business Growth </Text>
      <StatusBar style="auto" />
      <Link href="/home" style={{ color: "blue" }}>
        Ir al Home
      </Link>
    </View>
  );
}
