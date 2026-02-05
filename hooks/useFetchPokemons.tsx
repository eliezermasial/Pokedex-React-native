import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2";

type API = {
    "/pokemon?limit=21": {
        count: number,
        next: string | null,
        results: {name: string, url: string}[]
    }
};

export function useFetchPokemons<T extends keyof API>(path: T) {

    return useQuery({
        queryKey: ['pokemons', path],
        queryFn: async () => {

            await delay(1);
            const resolved = await fetch(endpoint + path);

            if (!resolved.ok) {
                throw new Error('Network response was not ok');
            }
            
            return resolved.json() as Promise<API[T]>;
        }
    })
}

export function useInfiniteFetchQuery<T extends keyof API>(path: T) {
    
    return useInfiniteQuery({
        queryKey: ['pokemons', path],
        initialPageParam: endpoint + path,
        queryFn: async ({pageParam}) => {

            await delay(1);
            const res = await fetch(pageParam);
            const json = await res.json() as API[T];

            return {
                results: json.results ?? [],
                next: json.next
            };
        },
        getNextPageParam: (lastPage) => {
            return lastPage.next ?? undefined;
        }
    })
}

function delay (duration: number) {
    return new Promise((resolve) => setTimeout(resolve, duration * 1000));
}