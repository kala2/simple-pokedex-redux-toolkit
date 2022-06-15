import { createApi } from "@reduxjs/toolkit/query/react";
import {
  setFetchedPokemon,
  setPagination,
  setPokemons,
} from "src/features/Pokemons/state/pokemonsSlice";
import { FetchedPokemon } from "src/features/Pokemons/types/FetchedPokemon";
import { PokemonResults } from "src/features/Pokemons/types/PokemonResults";
import { axiosBaseQuery } from "src/middleware/axiosBaseQuery";

export const POKEMONS_API_REDUCER_KEY = "pokemonsApi";

export const pokemonsApi = createApi({
  reducerPath: POKEMONS_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["Pokemons"],
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonResults, void>({
      query: () => ({
        url: "https://pokeapi.co/api/v2/pokemon",
        method: "GET",
      }),
      async onQueryStarted(uniqueIdentifier, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        const { results, ...rest } = data;
        dispatch(setPagination(rest));
        // Update state with new data from response
        dispatch(setPokemons(results));
      },
    }),
    getPagedPokemons: builder.mutation<PokemonResults, string | null>({
      query: (payload) => ({
        url: payload,
        method: "GET",
      }),
      async onQueryStarted(uniqueIdentifier, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        const { results, ...rest } = data;
        dispatch(setPagination(rest));
        // Update state with new data from response
        dispatch(setPokemons(results));
      },
    }),
    getPokemon: builder.query<FetchedPokemon, string | null>({
      query: (payload) => ({
        url: `https://pokeapi.co/api/v2/pokemon/${payload}`,
        method: "GET",
      }),
      async onQueryStarted(uniqueIdentifier, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        // Update state with new data from response
        dispatch(setFetchedPokemon(data));
      },
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useGetPagedPokemonsMutation,
  useGetPokemonQuery,
} = pokemonsApi;
