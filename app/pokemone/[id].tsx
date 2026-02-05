import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PokemoneId() {
    const params = useLocalSearchParams();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#24a0c5",
                padding: 20,
            }}
        >
            <Text>Received param: {params.id}</Text>
        </View>
    );
}