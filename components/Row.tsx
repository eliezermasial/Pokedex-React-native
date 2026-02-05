import { View, ViewProps } from "react-native";


type Props = ViewProps & {
    gap: number
};

export default function Row ({style, gap, ...rest}: Props) {
    return (
        <View style={[rowStyle, style, gap ? {gap: gap}: undefined]} {...rest} />
    )
}

const rowStyle = {
    flexDirection: "row",
    flex: 0,
    alignItems: "center",
} satisfies ViewProps["style"];