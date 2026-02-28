import { colors } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import ThedText from "./ThedText";
type Props = {
  name: keyof typeof colors.type;
};
export default function PokemonType({ name }: Props) {
  return (
    <View style={[styles.rootStyle, { backgroundColor: colors.type[name] }]}>
      <ThedText color="grayscaleLight" variant="subTitle3" style={styles.text}>
        {name}
      </ThedText>
    </View>
  );
}

const styles = StyleSheet.create({
  rootStyle: {
    flex: 0,
    height: 20,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  text: {
    textTransform: "capitalize",
  },
});
