import {StatusBar} from "expo-status-bar";
import { View, Text} from "react-native";
import "../../BusinessGrowth/global.css"
import {Link} from 'expo-router'

export default function App ()  {
return (
        <View className= "flex-1 items-center justify-center bg_white">
        <Text> Open Up </Text>
        <StatusBar style="auto"/>
        <Link href= "/profile" style ={{color: 'blue' }}>Go to profile</Link>
        </View>
);
}
