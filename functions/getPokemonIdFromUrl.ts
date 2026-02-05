
export default function getPokemonIdFromUrl(url: string): number {

    const id = url.split('/').filter(Boolean).pop();
    return Number(id);
}