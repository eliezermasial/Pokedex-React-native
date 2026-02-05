import { colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/useThemeColors";
import { StyleSheet, Text, TextProps } from "react-native";


const styles = StyleSheet.create({
    body3 : {
        fontSize : 10,
        lineHeight : 16,
    },
    headLine : {
        fontSize : 24,
        lineHeight : 32,
        fontWeight : "700",
    },
    caption : {
        fontSize : 8,
        lineHeight : 12,
    },
    subTitle1: {
        fontSize : 14,
        lineHeight : 16,
        fontWeight : "700",
    },
    subTitle2: {
        fontSize : 12,
        lineHeight : 16,
        fontWeight : "700",
    },
    subTitle3: {
        fontSize : 10,
        lineHeight : 16,
        fontWeight : "700",
    },
});

type props = TextProps & {
    variant ? : keyof typeof styles,
    color ? : keyof typeof colors.light,
};

export default function ThedText ({variant, color, style, ...rest}: props) {
    const ThemeColors = useThemeColor();
    return (
        <Text 
            style={[styles[variant ?? "body3"], style, {color: ThemeColors[color ?? "grayscaleLight"]}]} {...rest}
        />
    )
}

