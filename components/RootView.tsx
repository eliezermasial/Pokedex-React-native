import { useThemeColor } from "@/hooks/useThemeColors";
import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps;

export default function RootView({ style, ...rest }: Props) {
  const colors = useThemeColor();
  return (
    <SafeAreaView
      style={[RootStyle.container, { backgroundColor: colors.tint }, style]}
      {...rest}
    />
  );
}

const RootStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
});
