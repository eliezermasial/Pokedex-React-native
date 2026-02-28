import Card from "@/components/Card";
import PokemonItem from "@/components/PokemonItem";
import RootView from "@/components/RootView";
import Row from "@/components/Row";
import SearchBar from "@/components/SearchBar";
import SortButton from "@/components/SortButton";
import ThedText from "@/components/ThedText";
import getPokemonIdFromUrl from "@/functions/getPokemonIdFromUrl";
import { useInfiniteFetchQuery } from "@/hooks/useFetchPokemons";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

export default function Index() {
  const colors = useThemeColor();

  // State qui contient le texte de recherche saisi par user
  const [search, setSearch] = useState("");

  // State qui définit la clé de tri des Pokémon (par nom ou par id)
  const [sortKey, setSortKey] = useState<"name" | "id">("id");

  // Chemin de l’API pour récupérer les Pokémon avec une limite
  const path = "/pokemon?limit=21";

  // Hook de récupération des données avec pagination infinie
  // - data : données récupérées
  // - isLoading : chargement initial
  // - isFetching : chargement supplémentaire (scroll)
  // - fetchNextPage : fonction pour charger la page suivante
  const { data, isLoading, isFetching, fetchNextPage } =
    useInfiniteFetchQuery(path);

  // Transformation des données API en une liste simple de Pokémon
  // Chaque Pokémon contient un nom et un id extrait depuis l’URL
  const pokemons =
    data?.pages.flatMap((page) =>
      page?.results.map((r) => ({
        name: r.name,
        id: getPokemonIdFromUrl(r.url),
      })),
    ) ?? [];

  // Liste finale des Pokémon :
  // 1. Filtrée selon le texte de recherche (nom ou id)
  // 2. Triée dynamiquement selon la clé sélectionnée (name ou id)
  const filteredPokemons = [
    ...(search.trim().length > 0
      ? pokemons.filter(
          (p) =>
            p.name.toLocaleLowerCase().includes(search.toLowerCase()) ||
            p.id.toString() === search,
        )
      : pokemons),
  ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));

  if (isLoading) {
    return <ActivityIndicator color={colors.tint} size="small" />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <RootView>
        <Row style={[styles.header]} gap={16}>
          <Image
            source={require("@/assets/images/pokeball.png")}
            style={{ width: 24, height: 24 }}
          />
          <ThedText variant="headLine" color="grayscaleLight">
            Pokedex
          </ThedText>
        </Row>

        <Row gap={16} style={[styles.rowSearch]}>
          <SearchBar value={search} onChange={setSearch} />
          <SortButton value={sortKey} onChange={setSortKey} />
        </Row>

        <Card style={[styles.card]}>
          <FlatList
            data={filteredPokemons}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={styles.row}
            onEndReached={search ? undefined : () => fetchNextPage()}
            renderItem={({ item }) => (
              <PokemonItem name={item.name} id={item.id} />
            )}
            ListFooterComponent={
              isFetching ? (
                <ActivityIndicator color={colors.tint} size="small" />
              ) : null
            }
          />
        </Card>
      </RootView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 8,
  },
  card: {
    flex: 1,
  },
  row: {
    justifyContent: "space-between",
  },
  rowSearch: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 8,
  },
});
