import ThedText from "@/components/ThedText";
import { shaddows } from "@/constants/shaddows";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

type props = {
  name: string;
  id: number;
};

export default function PokemonItem({ name, id }: props) {
  return (
    <Link href={{ pathname: "/pokemone/[id]", params: { id: id } }} asChild>
      <Pressable>
        <View style={styles.item}>
          <View style={styles.header}>
            <ThedText variant="caption" color="medium">
              #00{id}
            </ThedText>
          </View>
          <View style={styles.center}>
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.footer}>
            <ThedText variant="body3" color="grayscaleDark">
              {name}
            </ThedText>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 4,
    width: 120,
    height: 108,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#afadad9c",
    backgroundColor: "#fff",
    ...shaddows.dp2,
  },

  header: {
    alignItems: "flex-end",
    paddingHorizontal: 6,
    paddingTop: 6,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    paddingBottom: 6,
    alignItems: "center",
  },

  image: {
    width: 60,
    height: 60,
  },
});
