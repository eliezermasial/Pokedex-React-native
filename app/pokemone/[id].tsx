import Card from "@/components/Card";
import PokemonSpacy from "@/components/PokemonSpacy";
import PokemonStats from "@/components/PokemonStats";
import PokemonType from "@/components/PokemonType";
import RootView from "@/components/RootView";
import Row from "@/components/Row";
import ThedText from "@/components/ThedText";
import { colors } from "@/constants/theme";
import formatSize from "@/functions/formatSize";
import formatWeight from "@/functions/formatWeight";
import pokemonArtWork from "@/functions/pokemonArtWork";
import { useFetchPokemon } from "@/hooks/useFetchPokemons";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function PokemoneId() {
  const params = useLocalSearchParams() as { id: string };
  const { data: pokemon } = useFetchPokemon("/pokemon/:id", {
    id: params.id,
  });
  const id = parseInt(params.id, 10);

  const { data: species } = useFetchPokemon("/pokemon-species/:id", {
    id: params.id,
  });
  if (!pokemon) {
    return (
      <RootView>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
          <ThedText style={{ marginTop: 12 }}>Loading Pokémon...</ThedText>
        </View>
      </RootView>
    );
  }
  const bio =
    species?.flavor_text_entries
      .find((e) => e.language.name === "en")
      ?.flavor_text.replace(/\n|\f/g, " ") ?? "";
  const mainsTypes = pokemon.types[0].type.name as keyof typeof colors.type;
  const colorType = mainsTypes ? colors.type[mainsTypes] : colors.light.tint;
  const types = pokemon?.types ?? [];

  // Fonction appelée quand on clique sur l’image du Pokémon
  // Création du son à partir de l’URL
  // démarre automatiquement la lecture shouldPlay
  // source audio distante uri: cry
  const onImagePress = async () => {
    const cry = pokemon?.cries?.latest;
    if (!cry) return;
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: cry,
      },
      { shouldPlay: true },
    );
    sound.playAsync();
  };
  const onPrevious = () => {
    const newId = Math.max(id - 1, 1);
    router.replace(`/pokemone/${newId}`);
  };
  const onNext = () => {
    const newId = Math.min(id + 1, 151);
    router.replace(`/pokemone/${newId}`);
  };
  const isFirstPokemon = id === 1;
  const isLastPokemon = id === 151;
  return (
    <RootView style={{ backgroundColor: colorType }}>
      {/* Header */}
      <View>
        <Image
          source={require("@/assets/images/pokeball.png")}
          style={[styles.pokeball, { width: 258, height: 258 }]}
        />
        <Row gap={10} style={styles.header}>
          <Row gap={10}>
            <Pressable onPress={() => router.back()}>
              <Image
                source={require("@/assets/images/arrow_back.png")}
                style={{ width: 32, height: 32 }}
              />
            </Pressable>
            <ThedText
              variant="headLine"
              color="grayscaleLight"
              style={{ textTransform: "capitalize" }}
            >
              {pokemon?.name}
            </ThedText>
          </Row>
          <ThedText variant="subTitle1" color="grayscaleLight">
            #{params.id.padStart(3, "0")}
          </ThedText>
        </Row>
      </View>
      {/* Body */}
      <View style={styles.body}>
        {/* Image */}
        <View style={styles.navigation}>
          {isFirstPokemon ? (
            <View></View>
          ) : (
            <Pressable onPress={onPrevious} style={styles.sideButton}>
              <Image
                source={require("@/assets/images/last.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>
          )}
          <Pressable onPress={onImagePress} style={styles.centerImage}>
            <Image
              source={{
                uri: pokemonArtWork({ id: params.id }),
              }}
              style={[styles.image, { width: 200, height: 200 }]}
              resizeMode="contain"
            />
          </Pressable>
          {isLastPokemon ? (
            <View></View>
          ) : (
            <Pressable onPress={onNext} style={styles.sideButton}>
              <Image
                source={require("@/assets/images/next.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </Pressable>
          )}
        </View>
        {/* card */}
        <Card style={styles.card}>
          {/* Types */}
          <Row gap={16}>
            {types.map((t) => (
              <PokemonType
                key={t.type.name}
                name={t.type.name as keyof typeof colors.type}
              />
            ))}
          </Row>
          {/* About */}
          <ThedText variant="subTitle1" style={{ color: colorType }}>
            About
          </ThedText>
          {/* Row Specification de pokemon */}
          <Row gap={0}>
            <PokemonSpacy
              title={formatWeight(pokemon?.weight)}
              description="weight"
              image={require("@/assets/images/weight.png")}
            />
            <PokemonSpacy
              title={formatSize(pokemon?.height)}
              description="size"
              image={require("@/assets/images/size.png")}
              style={[
                styles.spacySize,
                {
                  borderLeftColor: colors.light.wireframe,
                  borderRightColor: colors.light.wireframe,
                },
              ]}
            />
            <PokemonSpacy
              title={
                pokemon?.moves
                  .slice(0, 2)
                  .map((m) => m.move.name)
                  .join("\n") ?? ""
              }
              description="move"
            />
          </Row>
          {/* Bio */}
          <ThedText variant="subTitle1" color="medium">
            {bio}
          </ThedText>
          <View>
            <ThedText variant="subTitle1" style={{ color: colorType }}>
              Base Stats
            </ThedText>
          </View>
          <PokemonStats stats={pokemon?.stats ?? []} color={colorType} />
        </Card>
      </View>
    </RootView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    margin: 20,
    justifyContent: "space-between",
  },
  pokeball: {
    position: "absolute",
    top: 0,
    right: 8,
    opacity: 0.1,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
    top: -70,
  },

  sideButton: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20, // plus grand que l'image
  },
  centerImage: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
    elevation: 10,
  },
  image: {
    top: -40,
  },
  body: {
    marginTop: 150,
  },
  card: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 26,
  },
  spacySize: {
    borderLeftWidth: 1,
    paddingLeft: 16,
    borderRightWidth: 1,
    paddingRight: 16,
  },
});
