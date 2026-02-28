import { PokemonTypeColor } from "@/constants/theme";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2";

type API = {
  "/pokemon?limit=21": {
    count: number;
    next: string | null;
    results: { name: string; url: string }[];
  };
  "/pokemon/:id": {
    id: number;
    name: string;
    url: string;
    height: number;
    weight: number;
    moves: {
      move: {
        name: string;
      };
    }[];
    stats: {
      base_stat: number;
      stat: { name: string };
    }[];
    cries: {
      latest: string;
      legacy: string;
    };
    types: {
      slot: number;
      type: {
        name: PokemonTypeColor;
        url: string;
      };
    }[];
  };
  "/pokemon-species/:id": {
    flavor_text_entries: {
      flavor_text: string;
      language: { name: string };
    }[];
  };
};
type PaginatedEndpoint = "/pokemon?limit=21";

export function useFetchPokemon<T extends keyof API>(
  path: T,
  params?: Record<string, string | number>,
) {
  const localUrl = Object.entries(params ?? {}).reduce(
    (acc: string, [key, value]: [string, string | number]) =>
      acc.replaceAll(`:${key}`, String(value)),
    path,
  );
  return useQuery({
    queryKey: [localUrl],
    queryFn: async () => {
      await delay(1);
      const resolved = await fetch(endpoint + localUrl);

      if (!resolved.ok) {
        throw new Error("Network response was not ok");
      }

      return resolved.json() as Promise<API[T]>;
    },
  });
}

export function useInfiniteFetchQuery(path: PaginatedEndpoint) {
  return useInfiniteQuery({
    queryKey: ["pokemons", path],
    initialPageParam: endpoint + path,
    queryFn: async ({ pageParam }) => {
      await delay(1);
      const res = await fetch(pageParam);
      const json = (await res.json()) as API[PaginatedEndpoint];

      return {
        results: json.results ?? [],
        next: json.next,
      };
    },
    getNextPageParam: (lastPage) => {
      return lastPage.next ?? undefined;
    },
  });
}

function delay(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}
