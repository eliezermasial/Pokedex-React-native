export default function pokemonArtWork({
  id,
}: {
  id: number | string;
}): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
