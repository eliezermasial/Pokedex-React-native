import { shaddows } from "@/constants/shaddows";
import { useThemeColor } from "@/hooks/useThemeColors";
import { View, ViewProps } from "react-native";

type props = ViewProps;

export default function Card({ style, ...rest }: props) {
  const colors = useThemeColor();
  return (
    <View
      style={[style, { backgroundColor: colors.white }, styles]}
      {...rest}
    />
  );
}

const styles = {
  borderRadius: 8,
  padding: 5,
  ...shaddows.dp2,
} satisfies ViewProps["style"];
