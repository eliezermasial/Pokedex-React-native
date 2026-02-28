import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    View,
    ViewProps,
} from "react-native";
import Row from "./Row";
import ThedText from "./ThedText";

type Props = ViewProps & {
  title: string;
  description: string;
  image?: ImageSourcePropType;
};

export default function PokemonSpacy({
  style,
  image,
  title,
  description,
  ...rest
}: Props) {
  return (
    <View style={[styles.root, style]} {...rest}>
      <Row gap={0} style={styles.row}>
        {image && <Image source={image} style={{ width: 16, height: 16 }} />}
        <ThedText variant="subTitle2" color="medium">
          {title}
        </ThedText>
      </Row>
      <ThedText variant="caption" color="medium">
        {description}
      </ThedText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    gap: 16,
  },
  row: {
    height: 32,
    alignItems: "center",
  },
});
