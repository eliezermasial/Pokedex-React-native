import { ViewStyle } from "react-native";

export const shaddows = {
    dp2: {
        shadowColor: "#000000ff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 2,
    }
    
} satisfies Record<string, ViewStyle>;