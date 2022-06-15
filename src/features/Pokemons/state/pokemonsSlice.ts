import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../redux/store";
import { FetchedPokemon } from "../types/FetchedPokemon";
import { PaginationInfo } from "../types/PaginationInfo";
import { Pokemon } from "../types/Pokemon";
import { PokemonsState } from "../types/PokemonsState";

const initialState: PokemonsState = {
  pokemons: [],
  pokemon: null,
  fetchedPokemon: null,
  count: 0,
  next: null,
  previous: null,
};

const slice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, { payload }: PayloadAction<Pokemon[]>) => {
      state.pokemons = payload;
    },
    setPagination: (state, { payload }: PayloadAction<PaginationInfo>) => {
      state.count = payload.count;
      state.next = payload.next;
      state.previous = payload.previous;
    },
    setCurrentPokemon: (state, { payload }: PayloadAction<Pokemon | null>) => {
      state.pokemon = payload;
    },
    setFetchedPokemon: (
      state,
      { payload }: PayloadAction<FetchedPokemon | null>
    ) => {
      state.fetchedPokemon = payload;
    },
  },
});

export const {
  setPokemons,
  setPagination,
  setCurrentPokemon,
  setFetchedPokemon,
} = slice.actions;

export default slice.reducer;

export const selectPokemons = (state: RootState) => state.pokemons.pokemons;
export const selectPokemon = (state: RootState) => state.pokemons.pokemon;
export const selectState = (state: RootState) => state.pokemons;
